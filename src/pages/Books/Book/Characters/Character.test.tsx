import { customRender } from '../../../../utils/test/test-utils';
import { Character } from './Character';
import { CharacterModel } from './CharacterModel';

const character = {
  name: 'character1',
  url: 'https://anapioficeandfire.com/api/url1',
  father: 'https://anapioficeandfire.com/api/url2',
  mother: 'https://anapioficeandfire.com/api/url3',
  spouse: 'https://anapioficeandfire.com/api/url4',
  books: [
    'https://anapioficeandfire.com/api/url5',
    'https://anapioficeandfire.com/api/url6',
  ],
  titles: ['title1', 'title2'],
  aliases: ['alias1', 'alias2'],
  allegiances: [
    'https://anapioficeandfire.com/api/url7',
    'https://anapioficeandfire.com/api/url8',
  ],
} as CharacterModel;

describe('Character component', () => {
  it('should not render when character is null', () => {
    const { queryByTestId } = customRender(
      <Character character={null} handleClose={() => {}} />
    );

    const details = queryByTestId('character-details');
    expect(details).toBe(null);
  });

  it('should render character details', async () => {
    const { findByText, findByTestId } = customRender(
      <Character character={character} handleClose={() => {}} />
    );

    const details = await findByTestId('character-details');
    const name = await findByText('character1');
    const url = await findByText('url1');
    const father = await findByText('url2');
    const mother = await findByText('url3');
    const spouse = await findByText('url4');

    const book1 = await findByText('url5');
    const book2 = await findByText('url6');

    const allegiance1 = await findByText('url7');
    const allegiance2 = await findByText('url8');

    const allegiance = await findByText('url7');

    const titleList = await findByText('title1, title2');
    const aliasList = await findByText('alias1, alias2');

    expect(details).toBeInTheDocument();

    expect(name).toBeInTheDocument();

    expect(url).toBeInTheDocument();
    expect(url).toHaveClass('badge');

    expect(father).toBeInTheDocument();
    expect(father).toHaveClass('badge');

    expect(mother).toBeInTheDocument();
    expect(mother).toHaveClass('badge');

    expect(spouse).toBeInTheDocument();
    expect(spouse).toHaveClass('badge');

    expect(book1).toBeInTheDocument();
    expect(book1).toHaveClass('badge');

    expect(book2).toBeInTheDocument();
    expect(book2).toHaveClass('badge');

    expect(allegiance1).toBeInTheDocument();
    expect(allegiance1).toHaveClass('badge');

    expect(allegiance2).toBeInTheDocument();
    expect(allegiance2).toHaveClass('badge');

    expect(allegiance).toBeInTheDocument();
    expect(allegiance).toHaveClass('badge');

    expect(titleList).toBeInTheDocument();
    expect(aliasList).toBeInTheDocument();
  });
});
