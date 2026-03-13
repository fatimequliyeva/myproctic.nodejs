import { useEffect, useState } from "react";
import axios from "axios"

function Book() {

  const [books, setBooks] = useState([]);

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/books/${id}`)
      setBooks(books.filter(book => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  }

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/books')
        setBooks(response.data.data)
      }
      catch (err) {
        console.error(err.message)
      }
    }

    getBooks()
  }, [])

  return (
    <div>
      <h2>Kitablar</h2>

      <ul>
        {books.map(book => (
          <li key={book._id}>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <p>Author: {book.author}</p>
            <p>Price: {book.price} AZN</p>

            {book.coverImageURL && (
              <img
                src={`http://localhost:8080${book.coverImageURL}`}
                alt={book.title}
                width="150"
              />
            )}

            <button onClick={() => deleteBook(book._id)}>
              Delete
            </button>

          </li>
        ))}
      </ul>

    </div>
  );
}

export default Book;