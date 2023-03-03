import React, { createContext, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Book } from './BookModel';
import './Books.css';
import { BooksContext } from './Home';

const displayedColumns: { key: keyof Book; label: string }[] = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'authors',
    label: 'Authors',
  },
  {
    key: 'isbn',
    label: 'Isbn',
  },
  {
    key: 'mediaType',
    label: 'Media type',
  },
  {
    key: 'numberOfPages',
    label: 'Number of pages',
  },
  {
    key: 'publisher',
    label: 'Publisher',
  },
  {
    key: 'released',
    label: 'Released',
  },
  {
    key: 'country',
    label: 'Country',
  },
  {
    key: 'characters',
    label: 'Characters',
  },
];

export default function Books() {
  const { books } = useContext(BooksContext);
  const navigate = useNavigate();

  return (
    <section className="bookshelf">
      {books.map((book) => {
        return (
          <button
            className="book book-summary"
            type="button"
            key={book.isbn}
            onClick={() => navigate(`/books/${book.isbn}`)}
          >
            <h3 className="got-font pt-2 text-start">{book.name}</h3>
          </button>
        );
      })}
    </section>
    // <table className="table table-striped">
    //   <thead>
    //     <tr>
    //       {displayedColumns.map(({ label }) => (
    //         <th key={label} scope="col">
    //           {label}
    //         </th>
    //       ))}
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {books.map((book) => {
    //       return (
    //         <tr key={book.isbn}>
    //           {displayedColumns.map(({ key }) => (
    //             <td key={key}>{book[key]}</td>
    //           ))}
    //         </tr>
    //       );
    //     })}
    //   </tbody>
    // </table>
  );
}
