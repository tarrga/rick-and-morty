import { Link } from 'react-router-dom';
import { FaFilm } from 'react-icons/fa';

export default function EpisodeList({ episode }) {
  const episodeNumber = episode.substring(episode.indexOf('episode/') + 8);
  return (
    <>
      <Link to={`/episode/${episodeNumber}`} className='flex items-center'>
        Episode {episodeNumber} <FaFilm fill='#71B9F7' className='inline ml-6' />
      </Link>
    </>
  );
}
