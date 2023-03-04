import { useEffect, useState } from 'react';
import Book from './book/Book';
import { CharacterModel } from './book/CharacterModel';
import { BookModel, RawBookModel } from './BookModel';
import Books from './Books';

function generateRandomLightness(): string {
  const min = 10;
  const max = 40;
  return String(Math.floor(Math.random() * max - min) + min);
}

function Home() {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [characters, setCharacters] = useState<CharacterModel[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookModel | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('https://anapioficeandfire.com/api/books');
      const rawBooks = (await data.json()) as RawBookModel[];

      const formatedBooks: BookModel[] = rawBooks.map((rawBook) => {
        const book = rawBook;
        const releaseDate = new Date(book.released);
        book.released = releaseDate.toDateString();
        book.lightness = generateRandomLightness();
        return book;
      });

      setBooks(formatedBooks);
    };

    const fetchCharacters = async () => {
      const data = await fetch(
        'https://www.anapioficeandfire.com/api/characters'
      );
      const newCharacters = (await data.json()) as CharacterModel[];
      setCharacters(newCharacters);
    };

    fetchData().catch(console.error);

    const localCharactersString = localStorage.getItem('characters');

    if (localCharactersString) {
      const localCharacters = JSON.parse(localCharactersString);
      setCharacters(localCharacters);
    } else {
      fetchCharacters().catch(console.error);
    }
  }, []);

  useEffect(() => {
    const localCharactersString = localStorage.getItem('characters');
    if (!localCharactersString) {
      localStorage.setItem('characters', JSON.stringify(characters));
    }
  }, [characters]);

  return (
    <section>
      <h1 className="text-center got-font py-4">Game Of Thrones Bookshelf</h1>
      <div className="books-container">
        <Books
          books={books}
          setSelectedBook={(isbn) =>
            setSelectedBook(books.find((book) => book.isbn === isbn) ?? null)
          }
          selectedBook={selectedBook}
        />
      </div>
      <Book book={selectedBook} />
    </section>
  );
}

export default Home;
