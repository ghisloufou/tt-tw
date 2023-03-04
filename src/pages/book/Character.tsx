import './Book.css';
import { CharacterModel } from './CharacterModel';

function getDisplayedValue(value: string | string[]): {
  displayedValue: string;
  color: 'black' | 'grey';
} {
  if (typeof value === 'string' && value !== '') {
    return { displayedValue: value, color: 'black' };
  }

  if (
    value.length > 0 && // prevent empty array
    (value.length > 1 || value[0] !== '') && // prevent ['']
    value !== ''
  ) {
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
    <div className="ms-4">
      {Object.entries(character).map(([key, value]) => {
        const { displayedValue, color } = getDisplayedValue(value);
        return (
          <div key={key}>
            <span style={{ width: '100px', display: 'inline-block' }}>
              {key[0].toUpperCase() + key.slice(1)}
            </span>
            <span style={{ color }}>{displayedValue}</span>
          </div>
        );
      })}
    </div>
  );
}
