export type RawBookModel = {
  url: string;
  name: string;
  isbn: string;
  authors: string[];
  numberOfPages: number;
  publisher: string;
  country: string;
  mediaType: string;
  released: string;
  characters: string[];
  povCharacters: string[];
};

export interface BookModel extends RawBookModel {
  lightness: string;
}

// {
//   url: 'https://anapioficeandfire.com/api/books/1';
//   name: 'A Game of Thrones';
//   isbn: '978-0553103540';
//   authors: ['George R. R. Martin'];
//   numberOfPages: 694;
//   publisher: 'Bantam Books';
//   country: 'United States';
//   mediaType: 'Hardcover';
//   released: '1996-08-01T00:00:00';
//   characters: [];
//   povCharacters: [];
// };
