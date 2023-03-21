import { BookModel, RawBookModel } from '../pages/Books/BookModel';

// eslint-disable-next-line import/prefer-default-export
export async function fetchBooks(): Promise<BookModel[]> {
  try {
    const data = await fetch('https://anapioficeandfire.com/api/books');
    const rawBooks = (await data.json()) as RawBookModel[];

    const formatedBooks = rawBooks.map(bookMapper);

    return formatedBooks;
  } catch (error) {
    throw new Error('An error has occurred.');
  }
}

function generateRandomLightness(): string {
  const min = 10;
  const max = 40;
  return String(Math.floor(Math.random() * max - min) + min);
}

function bookMapper(rawBook: RawBookModel): BookModel {
  const releaseDate = new Date(rawBook.released);
  return {
    ...rawBook,
    lightness: generateRandomLightness(),
    released: releaseDate.toDateString(),
  };
}
