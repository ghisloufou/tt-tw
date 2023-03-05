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
  const [characterDetails, setCharacterDetails] = useState<
    DisplayedCharacterModel[]
  >([]);

  useEffect(() => {
    if (!character) {
      return;
    }

    setCharacterDetails(getCharacterDetails(character));
  }, [character]);

  if (!character) {
    return null;
  }

  return (
    <div className="character-details" data-testid="character-details">
      {characterDetails.map(({ key, formattedValue, color }) => {
        return (
          <div key={key}>
            <span
              style={{
                width: '100px',
                display: 'inline-block',
                fontWeight: '500',
              }}
            >
              {key[0].toUpperCase() + key.slice(1)}
            </span>
            <span style={{ color }}>{formattedValue}</span>
          </div>
        );
      })}
    </div>
  );
}

function getCharacterDetails(
  character: CharacterModel
): DisplayedCharacterModel[] {
  return Object.entries(character).map(([key, value]) => {
    const formattedValue = getFormattedValue(value, key);
    return {
      formattedValue,
      key,
      color: formattedValue === 'n/a' ? 'grey' : 'black',
    };
  });
}

function getFormattedValue(
  value: string | string[],
  key: string
): React.ReactNode {
  if (typeof value === 'string' && value !== '') {
    if (['url', 'spouse', 'father', 'mother'].includes(key)) {
      return <LinkToApi url={value} />;
    }

    return value;
  }

  if (
    value.length > 0 && // prevent empty array
    (value.length > 1 || value[0] !== '') && // prevent ['']
    value !== ''
  ) {
    if (['books', 'allegiances', 'povBooks'].includes(key)) {
      return value.map((url) => <LinkToApi key={url} url={url} />);
    }

    return value.join(', ');
  }

  return 'n/a';
}
