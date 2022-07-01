import { createContext, useState, useContext, useReducer } from 'react';
import rickMortyReducer from '../rickMorty/RickMortyReducer';

const RickMortyContext = createContext();

const RickMortyProvider = (props) => {
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

  const [state, dispatch] = useReducer(rickMortyReducer, initialState);

  // get search results
  const searchCharacters = async (page = 1, name = '', url = '') => {
    if (url === '') {
      url = `https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`;
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
    <RickMortyContext.Provider
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

const useRickMorty = () => {
  const context = useContext(RickMortyContext);
  if (!context) throw new Error('Not inside of provider');
  return context;
};

export { RickMortyProvider, useRickMorty };
