import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Book } from './BookModel';

export const BooksContext = createContext<{ books: Book[] }>({ books: [] });

function Home() {
  const [books, setBooks] = useState<{ books: Book[] }>({ books: [] });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('https://anapioficeandfire.com/api/books');
      const rawBooks = await data.json();
      const formatedBooks = rawBooks.map((rawBook: Book) => {
        const book = rawBook;
        const releaseDate = new Date(book.released);
        book.released = releaseDate.toDateString();
        return book;
      });
      setBooks({ books: formatedBooks });
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <BooksContext.Provider value={books}>
      <Outlet />
    </BooksContext.Provider>
  );
}

export default Home;
