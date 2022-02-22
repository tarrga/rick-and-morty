const githubReducer = (state, action) => {
  switch (action.type) {
    case 'getCharactersSearch': {
      return {
        ...state,
        characters: action.payload.results,
        searchInfo: action.payload.info,
        loading: false,
        fetchError: false,
        currentPage: action.payload.currentPage,
      };
    }
    case 'getCharacter': {
      return { ...state, character: action.payload, loading: false, fetchError: false };
    }
    case 'getCharacters': {
      return { ...state, loading: false, episodeCharactersObjects: action.payload, fetchError: false };
    }
    case 'getEpisode': {
      return {
        ...state,
        episode: action.payload,
        episodeCharacters: action.payload.characters,
        fetchError: false,
      };
    }
    case 'setLoading': {
      return { ...state, loading: true, fetchError: false };
    }
    case 'setFetchError': {
      return { ...state, fetchError: true, loading: false, characters: [] };
    }
    case 'deleteCharacters': {
      return { ...state, characters: [] };
    }
    default:
      return state;
  }
};

export default githubReducer;
