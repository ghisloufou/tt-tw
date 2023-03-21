import Book from './pages/Books/Book/Book';
import Books from './pages/Books/Books';
import useBooks from './pages/useBooks';

export default function App() {
  const { books, updateSelectedBook, selectedBookIsbn, error } = useBooks();
  const selectedBook = books.find((book) => book.isbn === selectedBookIsbn);

  return (
    <section>
      <h1 className="text-center got-font py-4">Game Of Thrones Bookshelf</h1>
      {error && <h3>{error}</h3>}
      <div className="books-container">
        <Books
          books={books}
          setSelectedBook={(isbn) => updateSelectedBook(isbn)}
          selectedBookIsbn={selectedBookIsbn}
        />
      </div>
      <Book book={selectedBook} />
    </section>
  );
}
