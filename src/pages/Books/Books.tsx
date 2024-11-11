import { BookModel } from './BookModel';
import './Books.css';

type BooksProps = {
  books: BookModel[];
  selectedBookIsbn: string | undefined;
  handleBookSelection: (isbn: string) => void;
};

export default function Books({
  books,
  selectedBookIsbn,
  handleBookSelection,
}: BooksProps) {
  return (
    <section
      className={`bookshelf ${
        selectedBookIsbn !== undefined && 'tiny-bookshelf'
      }`}
    >
      {books.map((book) => {
        return (
          <button
            title={book.name}
            className={`vertical-book got-font ${
              selectedBookIsbn === book.isbn ? 'selected-book' : ''
            }`}
            type="button"
            key={book.isbn}
            onClick={() => handleBookSelection(book.isbn)}
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
