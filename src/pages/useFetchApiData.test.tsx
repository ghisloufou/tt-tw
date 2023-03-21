import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderHook, waitFor } from '../utils/test/test-utils';
import { BookModel } from './Books/BookModel';
import useBooks from './useBooks';

const date = '1996-08-01T00:00:00';
const expectedDate = 'Thu Aug 01 1996';

const bookMocks: Partial<BookModel>[] = [
  { name: 'book1', isbn: 'isbn1', released: date },
  { name: 'book2', isbn: 'isbn2', released: date },
  { name: 'book3', isbn: 'isbn3', released: date },
];

const handlers = [
  rest.get('https://anapioficeandfire.com/api/books', (req, res, ctx) => {
    return res(ctx.json(bookMocks), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  vi.restoreAllMocks();
  localStorage.clear();
});
afterAll(() => server.close());

describe('useFetchApiData hook', () => {
  it('should return data from api when localStorage is empty and store them in localStorage', async () => {
    const expectedBooks: Partial<BookModel>[] = [
      { name: 'book1', isbn: 'isbn1', released: expectedDate, lightness: '40' },
      { name: 'book2', isbn: 'isbn2', released: expectedDate, lightness: '40' },
      { name: 'book3', isbn: 'isbn3', released: expectedDate, lightness: '40' },
    ];

    vi.spyOn(Math, 'random').mockImplementation(() => 1);

    const { result } = renderHook(() => useBooks());

    await waitFor(() => {
      expect(result.current.books).toEqual(expectedBooks);
      expect(result.current.selectedBookIsbn).toEqual(null);

      const bookStorage = localStorage.getItem('books');

      expect(bookStorage).toEqual(JSON.stringify(expectedBooks));
    });
  });

  it('should return data from localStorage when localStorage has data', async () => {
    const expectedBooks: Partial<BookModel>[] = [
      { name: 'book4', isbn: 'isbn4', released: expectedDate, lightness: '40' },
      { name: 'book5', isbn: 'isbn5', released: expectedDate, lightness: '40' },
      { name: 'book6', isbn: 'isbn6', released: expectedDate, lightness: '40' },
    ];

    vi.spyOn(Math, 'random').mockImplementation(() => 1);

    localStorage.setItem('books', JSON.stringify(expectedBooks));

    const setItemSpy = vi.spyOn(localStorage, 'setItem');

    const { result } = renderHook(() => useBooks());

    await waitFor(() => {
      expect(result.current.books).toEqual(expectedBooks);
      expect(result.current.selectedBookIsbn).toEqual(null);

      expect(setItemSpy).not.toHaveBeenCalled();
    });
  });
});
