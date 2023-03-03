import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Book from './pages/book/Book';
import Books from './pages/Books';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/books" />} />
      <Route element={<Home />}>
        <Route path="books" element={<Books />} />
        <Route path="books/:bookIsbn" element={<Book />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
