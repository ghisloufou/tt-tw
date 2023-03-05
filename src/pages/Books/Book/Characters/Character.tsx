import './Character.css';
import { CharacterModel } from './CharacterModel';
import LinkToApi from './LinkToApi';

function getDisplayedValue(
  value: string | string[],
  key: string
): {
  displayedValue: React.ReactNode;
  color: 'black' | 'grey';
} {
  if (typeof value === 'string' && value !== '') {
    if (['url', 'spouse', 'father', 'mother'].includes(key)) {
      return {
        displayedValue: <LinkToApi url={value} />,
        color: 'black',
      };
    }

    return { displayedValue: value, color: 'black' };
  }

  if (
    value.length > 0 && // prevent empty array
    (value.length > 1 || value[0] !== '') && // prevent ['']
    value !== ''
  ) {
    if (['books', 'allegiances', 'povBooks'].includes(key)) {
      return {
        displayedValue: value.map((url) => <LinkToApi key={url} url={url} />),
        color: 'black',
      };
    }

    return { displayedValue: value.join(', '), color: 'black' };
  }

  return { displayedValue: 'n/a', color: 'grey' };
}

type CharacterProps = {
  character: CharacterModel | null;
};

export default function Character({ character }: CharacterProps) {
  if (!character) {
    return null;
  }

  return (
    <div className="character-details">
      {Object.entries(character).map(([key, value]) => {
        const { displayedValue, color } = getDisplayedValue(value, key);
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
            <span style={{ color }}>{displayedValue}</span>
          </div>
        );
      })}
    </div>
  );
}
