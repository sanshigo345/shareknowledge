import { useState } from 'react';
import { shareknowledge_backend } from 'declarations/shareknowledge_backend';

function App() {
  const [bookTitle, setBookTitle] = useState('');
  const [bookList, setBookList] = useState([]);

  const onBookTitleChange = (event) => {
    setBookTitle(event.target.value);
  }

  function isBookInList(bookTitle) {
    for (const book of bookList) {
      if (book.title === bookTitle) {
        return true;
      }
    }
    return false;
  }

  const addBookHandler = async () => {

    if (bookTitle === '' && isBookInList(bookTitle)) {
      alert('Please enter a unique book title');
    } else {
      await shareknowledge_backend.addBook(bookTitle, true);
      getBookList();
    };
    setBookTitle('');
  }

  const getBookList = async () => {
    await shareknowledge_backend.getBooks().then((books) => {
      setBookList(books.reverse());
      console.log(books);
    })
  }

  const handleBorrow = async (index) => {
    await shareknowledge_backend.borrowBook(index);
    getBookList();
  }

  return (
    <main>
      <label htmlFor="title">Enter your book title: </label> <br />
      <input id="title" alt="title" type="text" onChange={onBookTitleChange} />
      <button onClick={addBookHandler}>Add this Book to Total Collection!</button>
      <div>
        <ul>
          {bookList.map((book, index) => (
            <li key={index}>
              {book.title}
              {book.available ? (
                <button onClick={() => handleBorrow(index)}>Borrow this book</button>
              ) : (
                <button disabled>Book already borrowed by someone</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
