import { useEffect, useState } from 'react';
import './Book.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { CharacterModel } from './CharacterModel';

const fetchCharacter = async (
  characterUrl: string
): Promise<CharacterModel> => {
  return fetch(characterUrl).then((response) => response.json());
};

type CharacterListProps = {
  bookCharacterUrls: string[];
};

export default function CharacterList({
  bookCharacterUrls,
}: CharacterListProps) {
  const [bookCharacters, setBookCharacters] = useState<CharacterModel[]>([]);
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
    <section className="d-flex">
      {isLoading ? (
        <h2 className="ms-4">Loading characters...</h2>
      ) : (
        <div className="ms-4">
          <h5>Characters in the book</h5>
          <ReactSearchAutocomplete
            items={bookCharacters.map((character) => {
              return { ...character, id: character.url };
            })}
          />
          <ul className="characters-list pe-4">
            {bookCharacters.map((character) => {
              return (
                <li key={character.url}>
                  {character.name !== ''
                    ? character.name
                    : character.aliases[0] ?? 'unknown'}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
