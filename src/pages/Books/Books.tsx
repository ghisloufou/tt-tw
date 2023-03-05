import { BookModel } from './BookModel';
import './Books.css';

type BooksProps = {
  books: BookModel[];
  selectedBook: BookModel | null;
  setSelectedBook: (isbn: string) => void;
};

export default function Books({
  books,
  selectedBook,
  setSelectedBook,
}: BooksProps) {
  return (
    <section className="bookshelf mb-5">
      {books.map((book) => {
        return (
          <button
            title={book.name}
            className={`vertical-book got-font ${
              selectedBook?.isbn === book.isbn ? 'selected-book' : ''
            }`}
            type="button"
            key={book.isbn}
            onClick={() => setSelectedBook(book.isbn)}
            style={{
              backgroundColor: `hsl(0, 0%, ${book.lightness}%)`,
            }}
          >
            <span>{book.name}</span>
          </button>
        );
      })}
    </section>
  );
}
