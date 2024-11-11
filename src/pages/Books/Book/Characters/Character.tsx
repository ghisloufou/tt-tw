import { ArrayCharacterData } from './ArrayCharacterData';
import './Character.css';
import { CharacterModel } from './CharacterModel';
import { LinkedArrayCharacterData } from './LinkedArrayCharacterData';
import { StringCharacterData } from './StringCharacterData';

type CharacterProps = {
  character: CharacterModel | null;
  handleClose: () => void;
};

export function Character({ character, handleClose }: CharacterProps) {
  if (!character) {
    return null;
  }

  return (
    <div className="character-details" data-testid="character-details">
      <button
        type="button"
        className="position-absolute top-0 end-0 btn btn-sm"
        onClick={handleClose}
      >
        close
      </button>

      <StringCharacterData label="Name:" value={character.name} />
      <StringCharacterData label="Gender:" value={character.gender} />
      <ArrayCharacterData label="Aliases:" values={character.aliases} />
      <LinkedArrayCharacterData
        label="Allegiances:"
        values={character.allegiances}
      />
      <LinkedArrayCharacterData label="Books:" values={character.books} />
      <ArrayCharacterData label="Titles:" values={character.titles} />
      <StringCharacterData
        label="Father:"
        value={character.father}
        isUrlValue
      />
      <StringCharacterData
        label="Mother:"
        value={character.mother}
        isUrlValue
      />
      <StringCharacterData
        label="Spouse:"
        value={character.spouse}
        isUrlValue
      />
      <StringCharacterData label="Birth date:" value={character.born} />
      <StringCharacterData label="Death date:" value={character.died} />
      <StringCharacterData label="Culture:" value={character.culture} />
      <ArrayCharacterData label="Actors:" values={character.playedBy} />
      <ArrayCharacterData label="Pov Books:" values={character.povBooks} />
      <ArrayCharacterData label="TV Series:" values={character.tvSeries} />
    </div>
  );
}
