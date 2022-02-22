import useLocalStorage from '../../hooks/useLocalStorage';

export default function InputName() {
  const [name, setName] = useLocalStorage('name', 'bob');

  const onChange = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <input onChange={onChange} type='text' />
      <div>{name}</div>
    </>
  );
}
