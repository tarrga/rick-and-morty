import { useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredVaue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? item : initialValue;
  });

  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredVaue(valueToStore);
    localStorage.setItem(key, valueToStore);
  };
  return [storedValue, setValue];
}
