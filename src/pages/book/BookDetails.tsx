import { BookModel } from '../BookModel';
import './Book.css';

type BookDetailsProps = {
  book: BookModel | null;
};

export default function BookDetails({ book }: BookDetailsProps) {
  if (!book) {
    return null;
  }

  return (
    <div
      className="book-details"
      style={{ backgroundColor: `hsl(0, 0%, ${book.lightness}%)` }}
    >
      <h2 className="got-font pt-2">{book.name}</h2>
      <div>
        Released on {book.released} in {book.country} and published by{' '}
        {book.publisher}
      </div>
      <br />
      <div>Written by {book.authors.join(', ')}</div>
      <br />
      <div>Isbn: {book.isbn}</div>
      <br />
      <div>{book.numberOfPages} pages</div>
    </div>
  );
}
