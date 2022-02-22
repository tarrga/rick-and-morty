import { createContext, useState, useContext, useReducer } from 'react';
import githubReducer from '../github/GithubReducer';

const GithubContext = createContext();

const GithubProvider = (props) => {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  const initialState = {
    search: '',
    characters: [],
    searchInfo: {},
    currentPage: '',
    character: {},
    episode: {},
    episodeCharacters: [],
    episodeCharactersObjects: [],
    loading: false,
    fetchError: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // get search results
  const searchCharacters = async (page = 1, name = '', status = '', url = '') => {
    if (url === '') {
      url = `https://rickandmortyapi.com/api/character/?page=${page}&name=${name}&status=${status}`;
    }
    try {
      setLoading();
      const response = await fetch(url);
      if (!response.ok) throw new Error('fetch error');

      const { results, info } = await response.json();
      const currentPage =
        info.next === null
          ? info.pages
          : info.next.substring(info.next.indexOf('page=') + 5, info.next.lastIndexOf('&name')) - 1;

      dispatch({ type: 'getCharactersSearch', payload: { results, info, currentPage } });
    } catch (e) {
      dispatch({ type: 'setFetchError' });
    }
  };

  //get Character
  const getCharacter = async (id) => {
    try {
      setLoading();
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      if (!response.ok) throw new Error('No character with that id');

      const result = await response.json();
      if (!Array.isArray(result)) {
        dispatch({ type: 'getCharacter', payload: result });
      } else {
        dispatch({ type: 'getCharacters', payload: result });
      }
    } catch (e) {
      dispatch({ type: 'setFetchError' });
    }
  };

  //get episode
  const getEpisode = async (id) => {
    try {
      setLoading();
      const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
      if (!response.ok) throw new Error('No Episode with that id');

      const result = await response.json();

      dispatch({ type: 'getEpisode', payload: result });
      const ids = result.characters.map((character) => {
        return +character.substring(character.indexOf('character/') + 10);
      });
      getCharacter(ids);
    } catch (e) {
      dispatch({ type: 'setFetchError' });
    }
  };

  //set loading
  const setLoading = () => dispatch({ type: 'setLoading' });

  //delete users
  const deleteCharacters = () => dispatch({ type: 'deleteCharacters' });

  return (
    <GithubContext.Provider
      value={{
        characters: state.characters,
        search: state.search,
        loading: state.loading,
        searchInfo: state.searchInfo,
        fetchError: state.fetchError,
        currentPage: state.currentPage,
        episodeCharacters: state.episodeCharacters,
        episodeCharactersObjects: state.episodeCharactersObjects,
        searchCharacters,
        getCharacter,
        getEpisode,
        deleteCharacters,
        character: state.character,
        episode: state.episode,
      }}
      {...props}
    />
  );
};

const useGithub = () => {
  const context = useContext(GithubContext);
  if (!context) throw new Error('Not inside of provider');
  return context;
};

export { GithubProvider, useGithub };
