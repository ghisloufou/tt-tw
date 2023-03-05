import { BookModel } from '../BookModel';
import './Book.css';
import BookDetails from './BookDetails';
import Characters from './Characters/Characters';

type BookProps = {
  book: BookModel | null;
};

export default function Book({ book }: BookProps) {
  if (!book) {
    return null;
  }

  return (
    <section className="d-flex flex-wrap p-3">
      <BookDetails book={book} />

      <Characters bookCharacterUrls={book.characters} />
    </section>
  );
}
