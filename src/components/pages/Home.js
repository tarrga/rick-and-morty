import React from 'react';
import CharacterResults from '../layout/characters/CharacterResults';
import CharacterSearch from '../layout/characters/CharacterSearch';

export default function Home() {
  return (
    <>
      <CharacterSearch />
      <CharacterResults />
    </>
  );
}
