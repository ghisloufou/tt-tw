import Book from './pages/Books/Book/Book';
import Books from './pages/Books/Books';
import useFetchApiData from './pages/useFetchApiData';

export default function App() {
  const { books, updateSelectedBook, selectedBook } = useFetchApiData();

  return (
    <section>
      <h1 className="text-center got-font py-4">Game Of Thrones Bookshelf</h1>
      <div className="books-container">
        <Books
          books={books}
          setSelectedBook={(isbn) => updateSelectedBook(isbn)}
          selectedBook={selectedBook}
        />
      </div>
      <Book book={selectedBook} />
    </section>
  );
}
