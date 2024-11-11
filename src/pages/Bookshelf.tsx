import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Book } from './Books/Book/Book';
import { Books } from './Books/Books';
import { fetchBooks } from '../business/fetchBooks';
import { Characters } from './Books/Book/Characters/Characters';

export function Bookshelf() {
  const query = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });
  const [selectedBookIsbn, setSelectedBookIsbn] = useState<string | undefined>(
    undefined
  );

  const selectedBook = query.data?.find(
    (book) => book.isbn === selectedBookIsbn
  );

  if (query.isPending) return <div>Loading books...</div>;

  if (query.error)
    return <div>`An error has occurred: ${query.error.message}`</div>;

  return (
    <section className="px-4">
      <h1 className="text-center got-font py-4">
        <button
          type="button"
          style={{ border: 'none', background: 'transparent' }}
          onClick={() => setSelectedBookIsbn(undefined)}
        >
          Game Of Thrones Bookshelf
        </button>
      </h1>
      <div className="d-flex justify-content-center gap-3">
        <div>
          <Books
            books={query.data}
            handleBookSelection={setSelectedBookIsbn}
            selectedBookIsbn={selectedBookIsbn}
          />
          {selectedBookIsbn === undefined && (
            <span className="ms-3 fw-bold">Choose a book!</span>
          )}
        </div>

        <Book book={selectedBook} />
        <Characters
          key={selectedBook?.isbn}
          bookCharacterUrls={selectedBook?.characters}
        />
      </div>
    </section>
  );
}
