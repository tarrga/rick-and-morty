import { useState } from 'react';
import { useGithub } from '../../context/github/GithunbContext';
import { useAlert } from '../../context/alert/AlertContext';

export default function CharacterSearch() {
  const { characters, searchCharacters, deleteCharacters } = useGithub();
  const { setAlert } = useAlert();

  const [text, setText] = useState('');
  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === '') setAlert('please enter something', 'error');
    if (text !== '') {
      searchCharacters(1, text, '');
      setText('');
    }
  };

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <div className='relative'>
              <input
                className='input w-full pr-40 bg-gray-200 input input-lg text-black'
                placeholder='Search'
                value={text}
                onChange={handleChange}
              />
              <button type='submit' className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'>
                GO
              </button>
            </div>
          </div>
        </form>
      </div>
      {characters.length > 0 && (
        <div>
          <button className='btn btn-ghost btn-lg' onClick={deleteCharacters}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
