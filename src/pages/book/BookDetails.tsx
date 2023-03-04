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
        Released on <b>{book.released}</b> in <b>{book.country}</b> and
        published by <b>{book.publisher}</b>
      </div>
      <br />
      <div>
        Written by <b>{book.authors.join(', ')}</b>
      </div>
      <br />
      <div>
        Isbn: <b>{book.isbn}</b>
      </div>
      <br />
      <div>
        <b>{book.numberOfPages}</b> pages
      </div>
    </div>
  );
}
