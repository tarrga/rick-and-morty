import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRickMorty } from '../../context/rickMorty/RickMortyContext';
import Spinner from '../Spinner';

export default function CharacterItem({ character }) {
  const { id, name, image } = character;
  const { loading, fetchError } = useRickMorty();

  if (!loading && !fetchError) {
    return (
      <>
        <div className='card shadow-md compact side bg-base-100'>
          <div className='flex-row items-center space-x-4 card-body'>
            <div>
              <div className='avatar'>
                <div className='rounded-full shadow w-14 h-14'>
                  <img src={image} alt='character' />
                </div>
              </div>
            </div>

            <div>
              <h2 className='card-title'>{name}</h2>
              <Link className='text-base-content text-opacity-40' to={`/character/${id}`}>
                Visit Character
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (loading) {
    return <Spinner />;
  }
}
