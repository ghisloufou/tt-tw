import { customRender } from '../../utils/test/test-utils';
import { BookModel } from './BookModel';
import { Books } from './Books';

const bookMocks = [
  { name: 'book1', isbn: 'isbn1' },
  { name: 'book2', isbn: 'isbn2' },
  { name: 'book3', isbn: 'isbn3' },
] as BookModel[];

describe('Books component', () => {
  it('should render a list of clickable book names, with the selected book above and change selectedBook on book click', async () => {
    const setSelectedBookMock = vi.fn();
    const { findByText, user } = customRender(
      <Books
        books={bookMocks}
        selectedBookIsbn={bookMocks[0].isbn}
        handleBookSelection={setSelectedBookMock}
      />
    );

    const book1 = await findByText('book1');
    const book2 = await findByText('book2');
    const book3 = await findByText('book3');

    expect(book1).toBeInTheDocument();
    expect(book1.parentElement).toHaveClass('selected-book');

    expect(book2).toBeInTheDocument();
    expect(book3).toBeInTheDocument();

    await user.click(book3);

    expect(setSelectedBookMock).toHaveBeenCalledTimes(1);
    expect(setSelectedBookMock).toHaveBeenNthCalledWith(1, 'isbn3');
  });
});
