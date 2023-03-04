import { useEffect, useState } from 'react';
import './Book.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { CharacterModel } from './CharacterModel';

const fetchCharacter = async (
  characterUrl: string
): Promise<CharacterModel> => {
  return fetch(characterUrl).then((response) => response.json());
};

type CharacterProps = {
  character: CharacterModel;
};

export default function Character({ character }: CharacterProps) {
  return (
    <div>
      {character.name} {}
    </div>
  );
}
