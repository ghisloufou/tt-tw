import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { customRender } from '../utils/test/test-utils';
import { BookModel } from './Books/BookModel';
import Books from './Books/Books';

const bookMocks: Partial<BookModel>[] = [
  { name: 'book1', isbn: 'book1' },
  { name: 'book2' },
  { name: 'book3' },
];

const handlers = [
  rest.get('https://anapioficeandfire.com/api/books', (req, res, ctx) => {
    return res(ctx.json(bookMocks), ctx.delay(150));
  }),
];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe.skip('Books component', () => {
  it('should display a list of books from GOT API', async () => {
    const { findByText } = customRender(<Books />);

    expect(await findByText('book1')).toBeInTheDocument();
    expect(await findByText('book2')).toBeInTheDocument();
    expect(await findByText('book3')).toBeInTheDocument();
  });

  it('should enable the user to click on a book to open its details', async () => {
    const { findByText, user } = customRender(<Books />);

    const firstBook = await findByText('book1');
    expect(firstBook).toBeInTheDocument();

    await user.click(firstBook);

    expect(firstBook).not.toBeInTheDocument();
  });
});
