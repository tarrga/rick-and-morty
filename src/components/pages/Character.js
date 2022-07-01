import { FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import EpisodeList from '../layout/episodes/EpisodeList';
import Spinner from '../layout/Spinner';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRickMorty } from '../context/rickMorty/RickMortyContext';

export default function Character() {
  const { getCharacter, character, loading } = useRickMorty();
  const params = useParams();

  useEffect(() => {
    getCharacter(params.login);
  }, []);

  const { id, name, gender, episode, image, location, species, status, type, created, origin } = character;

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
          <div className='custom-card-image mb-6 md:mb-0'>
            <div className='rounded-lg shadow-xl card image-full'>
              <img src={image} alt='' className='w-full' />
            </div>
          </div>

          <div className='col-span-2'>
            <div className='mb-2'>
              <h1 className='text-3xl card-title'>
                {name}
                <div className='ml-2 mr-1 badge badge-info'>{species}</div>
                <div className={`ml-2 mr-1 badge ${status === 'Alive' ? 'badge-success' : 'badge-danger'}`}>
                  {status === 'unknown' ? 'Maybe Alive' : status}
                </div>

                {type && <div className='mx-1 badge badge-warning'>{type}</div>}
              </h1>
              <div className='mt-4 card-actions'></div>
            </div>
            <div className='w-full rounded-lg shadow-md bg-base-100 stats'>
              {location && (
                <div className='stat'>
                  <div className='stat-title text-md'>Last known location</div>
                  <div className='text-lg stat-value'>{location.name}</div>
                  {origin.name !== 'unknown' && <div className='stat-title text-md'>First seen in</div>}
                  {origin.name !== 'unknown' && <div className='text-lg stat-value'>{origin.name}</div>}
                  <div className='stat-title text-md'>Created</div>
                  <div className='text-lg stat-value'>{created.slice(0, 10)}</div>
                  <div className='stat-title text-md'>Gender</div>
                  <div className='text-lg stat-value'>{gender}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats'>
          <div className='stat'>
            <div className='stat-figure text-secondary'>
              <FaUsers className='text-3xl md:text-5xl' />
            </div>
            <div className='stat-title pr-5'>Episodes in which this character appeared</div>
            {episode && <div className='stat-value pr-5 text-3xl md:text-4xl'>{episode.length}</div>}
          </div>
        </div>
        <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 shadow-md rounded-lg stat'>
          {episode && episode.map((episode) => <EpisodeList key={episode} episode={episode} />)}
        </div>
      </div>
    </>
  );
}
