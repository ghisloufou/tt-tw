import { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BooksContext } from '../Home';

export default function Book() {
  const params = useParams();
  const { books } = useContext(BooksContext);
  const book = books.find(({ isbn }) => isbn === params.bookIsbn);

  useEffect(() => {}, []);

  if (!book) {
    return <div>Book not found</div>;
  }
  return (
    <div>
      <Link to="/books">Home</Link>
      <section className="d-flex">
        <div className="book book-details">
          <h2 className="got-font pt-2">{book.name}</h2>
          <div>
            Released on {book.released} in {book.country} and published by{' '}
            {book.publisher}
          </div>
          <br />
          <div>Written by {book.authors.join(', ')}</div>
          <br />
          <div>Isbn: {params.bookIsbn}</div>
          <br />
          <div>{book.numberOfPages} pages</div>
        </div>
        <ul className="characters-list">
          {book.characters.map((character) => {
            return <li key={character}>{character}</li>;
          })}
        </ul>
      </section>
    </div>
  );
}
