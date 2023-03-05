import { useEffect, useState } from 'react';
import { BookModel, RawBookModel } from './Books/BookModel';

function generateRandomLightness(): string {
  const min = 10;
  const max = 40;
  return String(Math.floor(Math.random() * max - min) + min);
}

export default function useFetchApiData(): {
  updateSelectedBook: (isbn: string) => void;
  selectedBook: BookModel | null;
  books: BookModel[];
} {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookModel | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('https://anapioficeandfire.com/api/books');
      const rawBooks = (await data.json()) as RawBookModel[];

      const formatedBooks: BookModel[] = rawBooks.map((rawBook) => {
        const releaseDate = new Date(rawBook.released);
        return {
          ...rawBook,
          lightness: generateRandomLightness(),
          released: releaseDate.toDateString(),
        };
      });
      localStorage.setItem('books', JSON.stringify(formatedBooks));
      setBooks(formatedBooks);
    };

    const localStorageBooks = localStorage.getItem('books');

    if (localStorageBooks !== null) {
      const localBooks = JSON.parse(localStorageBooks);
      setBooks(localBooks);
    } else {
      fetchData().catch(console.error);
    }
  }, []);

  function updateSelectedBook(isbn: string) {
    setSelectedBook(books.find((book) => book.isbn === isbn) ?? null);
  }

  return { updateSelectedBook, selectedBook, books };
}
