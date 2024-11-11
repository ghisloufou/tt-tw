import { useState } from 'react';
import Select from 'react-select';
import { useQueries } from '@tanstack/react-query';
import Character from './Character';
import { CharacterModel } from './CharacterModel';

const fetchCharacter = async (
  characterUrl: string
): Promise<CharacterModel> => {
  const response = await fetch(characterUrl);
  if (!response.ok) {
    throw new Error('Could not fetch character');
  }

  return response.json();
};

type CharacterListProps = {
  bookCharacterUrls: string[] | undefined;
};

export default function Characters({ bookCharacterUrls }: CharacterListProps) {
  const [selectedCharacter, setSelectedCharacter] =
    useState<CharacterModel | null>(null);

  const { data, isLoading, isError } = useQueries({
    queries: (bookCharacterUrls ?? []).map((url) => ({
      queryKey: ['character', url],
      queryFn: () => fetchCharacter(url),
      staleTime: Infinity,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        isLoading: results.some((result) => result.isLoading),
        isError: results.some((result) => result.isError),
      };
    },
  });

  function handleCharacterChange(
    newSelectedCharacter: CharacterModel | undefined
  ) {
    setSelectedCharacter(newSelectedCharacter ?? null);
  }

  if (!bookCharacterUrls) {
    return null;
  }

  if (isError) {
    return <div>Failed to load characters</div>;
  }

  const charactersOptions = data.map((character) => {
    return {
      value: character,
      label:
        character?.name !== ''
          ? character?.name
          : character.aliases[0] ?? 'unknown',
    };
  });

  return (
    <>
      <div>
        <h5 className="text-nowrap">Characters from the book</h5>
        {isLoading ? (
          <Select placeholder="Loading characters..." />
        ) : (
          <Select
            options={charactersOptions}
            onChange={(option) => handleCharacterChange(option?.value)}
          />
        )}
      </div>

      <Character
        character={selectedCharacter}
        handleClose={() => {
          setSelectedCharacter(null);
        }}
      />
    </>
  );
}
