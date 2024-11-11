import { BookModel, RawBookModel } from '../pages/Books/BookModel';

export async function fetchBooks(): Promise<BookModel[]> {
  const data = await fetch('https://anapioficeandfire.com/api/books');
  if (!data.ok) {
    throw new Error('Network issue: cannot retrieve books.');
  }

  const rawBooks = (await data.json()) as RawBookModel[];

  return rawBooks.map(transformRawBookToBook);
}

export function transformRawBookToBook(rawBook: RawBookModel): BookModel {
  const releaseDate = new Date(rawBook.released);

  return {
    ...rawBook,
    lightness: generateRandomLightness(),
    released: releaseDate.toDateString(),
  };
}

function generateRandomLightness(): string {
  const min = 10;
  const max = 40;
  return String(Math.floor(Math.random() * max - min) + min);
}
