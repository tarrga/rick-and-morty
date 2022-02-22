import { useGithub } from '../context/github/GithunbContext';
import { RiMovie2Fill } from 'react-icons/ri';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { useEffect } from 'react';
import { FaUsers } from 'react-icons/fa';
import CharacterItem from '../layout/characters/CharacterItem';

export default function Episode() {
  const { getEpisode, episode, loading, episodeCharacters, getCharacter, episodeCharactersObjects } = useGithub();
  const { name, air_date, characters } = episode;
  const { id } = useParams();

  const ids = episodeCharacters.map((character) => {
    return +character.substring(character.indexOf('character/') + 10);
  });

  useEffect(() => {
    getEpisode(id);
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <div className='w-full mx-auto lg:w-10/12'>
        <div className='mb-4'>
          <Link to='/' className='btn.btn-ghost'>
            Back To Search
          </Link>
        </div>
        <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
          <div className='custom-card-image mb-6 md:mb-0 self-end shadow-xl rounded-lg'>
            <div className='rounded-lg card'>
              <RiMovie2Fill className='text-9xl' />
            </div>
          </div>

          <div className='col-span-2'>
            <div className='mb-2'>
              <h1 className='text-3xl card-title'>{name}</h1>
              <div className='mt-4 card-actions'></div>
            </div>
            <div className='w-full rounded-lg shadow-md bg-base-100 stats'>
              {
                <div className='stat'>
                  <div className='stat-title text-md'>Episode released on</div>
                  <div className='text-lg stat-value'>{air_date}</div>
                  <div className='stat-title text-md'>Episode</div>
                  <div className='text-lg stat-value'>{episode.episode}</div>
                </div>
              }
            </div>
          </div>
        </div>

        <div className='w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats'>
          <div className='stat'>
            <div className='stat-figure text-secondary'>
              <FaUsers className='text-3xl md:text-5xl' />
            </div>
            <div className='stat-title pr-5'>List of characters who have been seen in the episode</div>
            {episode && <div className='stat-value pr-5 text-3xl md:text-4xl'>{characters && characters.length}</div>}
          </div>
        </div>
        <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 shadow-md rounded-lg stat'>
          {episodeCharactersObjects.map((character, idx) => (
            <CharacterItem key={idx} character={character} />
          ))}
        </div>
      </div>
    </>
  );
}
