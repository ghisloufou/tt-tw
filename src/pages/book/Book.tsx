import { BookModel } from '../BookModel';
import './Book.css';
import BookDetails from './BookDetails';
import CharacterList from './CharacterList';

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

      <CharacterList bookCharacterUrls={book.characters} />
    </section>
  );
}
