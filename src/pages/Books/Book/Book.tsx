import { BookModel } from '../BookModel';
import './Book.css';

type BookProps = {
  book: BookModel | undefined;
};

export default function Book({ book }: BookProps) {
  if (!book) {
    return null;
  }

  return (
    <div
      className="book-details"
      style={{
        backgroundColor: `hsl(0, 0%, ${book.lightness}%)`,
        position: 'relative',
      }}
    >
      <h2 className="got-font pt-2">{book.name}</h2>
      <div>
        Released on <b>{book.released}</b> in <b>{book.country}</b> and
        published by <b>{book.publisher}</b>
      </div>
      <br />
      <div>
        Written by <b>{book.authors.join(', ')}</b>
      </div>
      <br />
      <div>
        Type of book: <b>{book.mediaType}</b>
      </div>
      <div>
        Isbn: <b>{book.isbn}</b>
      </div>
      <br />
      <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
        <b>{book.numberOfPages}</b> pages
      </div>
    </div>
  );
}
