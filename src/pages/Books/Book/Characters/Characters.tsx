import { useEffect, useState } from 'react';
import Select from 'react-select';
import Character from './Character';
import { CharacterModel } from './CharacterModel';

const fetchCharacter = async (
  characterUrl: string
): Promise<CharacterModel> => {
  return fetch(characterUrl).then((response) => response.json());
};

type CharacterListProps = {
  bookCharacterUrls: string[];
};

export default function Characters({ bookCharacterUrls }: CharacterListProps) {
  const [bookCharacters, setBookCharacters] = useState<CharacterModel[]>([]);
  const [selectedCharacter, setSelectedCharacter] =
    useState<CharacterModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const localStorageCharacters = localStorage.getItem('characters');
    const localCharacters: CharacterModel[] = localStorageCharacters
      ? JSON.parse(localStorageCharacters)
      : [];
    const newlyFetchedCharacters: CharacterModel[] = [];

    const getLocalOrFetchCharacters = async () => {
      const charactersPromises = bookCharacterUrls.map(async (characterUrl) => {
        const localCharacter = localCharacters.find(
          ({ url }) => url === characterUrl
        );
        if (localCharacter !== undefined) {
          return localCharacter;
        }

        const newCharacter = await fetchCharacter(characterUrl);
        newlyFetchedCharacters.push(newCharacter);
        return newCharacter;
      });

      const retreivedCharacters = await Promise.all(charactersPromises);

      if (newlyFetchedCharacters.length) {
        localStorage.setItem(
          'characters',
          JSON.stringify(localCharacters.concat(newlyFetchedCharacters))
        );
      }

      setBookCharacters(retreivedCharacters);
    };

    getLocalOrFetchCharacters()
      .then(() => setIsLoading(false))
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookCharacterUrls]);

  return (
    <>
      <div className="ms-4 me-4">
        <h5 className="text-nowrap">Characters from the book</h5>
        {isLoading ? (
          <Select placeholder="Loading characters..." />
        ) : (
          <Select
            options={bookCharacters.map((character) => {
              return {
                value: character,
                label:
                  character.name !== ''
                    ? character.name
                    : character.aliases[0] ?? 'unknown',
              };
            })}
            onChange={(option) => setSelectedCharacter(option?.value ?? null)}
          />
        )}
      </div>

      <Character character={selectedCharacter} />
    </>
  );
}
