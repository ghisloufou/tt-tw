import { useEffect, useState } from 'react';
import './Character.css';
import { CharacterModel } from './CharacterModel';
import LinkToApi from './LinkToApi';

type CharacterProps = {
  character: CharacterModel | null;
};

type DisplayedCharacterModel = {
  key: string;
  formattedValue: React.ReactNode;
  color: 'black' | 'grey';
};

export default function Character({ character }: CharacterProps) {
  if (!character) {
    return null;
  }

  return (
    <div className="character-details" data-testid="character-details">
      <div>
        <span className="character-data">Name:</span>
        <span>{character.name}</span>
      </div>

      {/*  TODO: Add all character details (in dedicated components) */}
    </div>
  );
}

// function getFormattedValue(
//   value: string | string[],
//   key: string
// ): React.ReactNode {
//   if (typeof value === 'string' && value !== '') {
//     if (['url', 'spouse', 'father', 'mother'].includes(key)) {
//       return <LinkToApi url={value} />;
//     }

//     return value;
//   }

//   if (
//     value.length > 0 && // prevent empty array
//     (value.length > 1 || value[0] !== '') && // prevent ['']
//     value !== ''
//   ) {
//     if (['books', 'allegiances', 'povBooks'].includes(key)) {
//       return value.map((url) => <LinkToApi key={url} url={url} />);
//     }

//     return value.join(', ');
//   }

//   return 'n/a';
// }
