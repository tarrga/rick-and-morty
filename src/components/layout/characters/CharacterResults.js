import Spinner from '../Spinner';
import FetchError from '../../pages/FetchError';
import CharacterItem from './CharacterItem';
import { useRickMorty } from '../../context/rickMorty/RickMortyContext';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

export default function CharacterResults() {
  const { characters, loading, fetchError, searchInfo, searchCharacters, currentPage } = useRickMorty();
  const { prev, next, pages } = searchInfo;

  // console.log(currentPage);
  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  if (!loading && !fetchError) {
    return (
      <>
        <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
          {characters.map((character) => (
            <CharacterItem key={character.id} character={character} />
          ))}
        </div>
        {characters.length > 0 && (
          <div className='flex items-center justify-evenly w-6/12 m-auto mt-14'>
            <button
              type='button'
              onClick={() => prev !== null && searchCharacters('', '', '', prev)}
              className='text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700'
            >
              <FaChevronLeft />
            </button>
            <span>
              {currentPage} / {pages}
            </span>
            <button
              type='button'
              onClick={() => next !== null && searchCharacters('', '', '', next)}
              className='text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700'
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </>
    );
  }
  if (loading) {
    return <Spinner />;
  } else {
    return <FetchError />;
  }
}
