import { useEffect, useState } from 'react';
import { fetchBooks } from '../business/fetchBooks';
import type { BookModel } from './Books/BookModel';

export default function useBooks(): {
  updateSelectedBook: (isbn: string) => void;
  selectedBookIsbn: string | undefined;
  books: BookModel[];
  error?: string;
} {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [selectedBookIsbn, setSelectedBookIsbn] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const localStorageBooks = localStorage.getItem('books');

    if (localStorageBooks !== null) {
      const localBooks = JSON.parse(localStorageBooks);
      setBooks(localBooks);
    } else {
      fetchBooks()
        .then((newBooks) => {
          setBooks(newBooks);
          setError(undefined);
          localStorage.setItem('books', JSON.stringify(newBooks));
        })
        .catch((err) => setError(err));
    }
  }, []);

  function updateSelectedBook(isbn: string) {
    setSelectedBookIsbn(isbn);
  }

  return { updateSelectedBook, selectedBookIsbn, books, error };
}
