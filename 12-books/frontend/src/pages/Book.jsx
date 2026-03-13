import { useEffect, useState } from "react";
import axios from "axios";

function Book() {
  const [books, setBooks] = useState([]);

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/books/${id}`);
      setBooks(books.filter(book => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/books");
        setBooks(response.data.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    getBooks();
  }, []);

  return (
    <div className="container mx-auto py-8 px-6">
      <h2 className="text-2xl font-bold mb-6">📚 Kitablar</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col"
          >
            {book.coverImageURL && (
              <img
                src={book.coverImageURL.startsWith("http")
                  ? book.coverImageURL
                  : `http://localhost:8080${book.coverImageURL}`}
                alt={book.title}
              />
            )}
            <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
            <p className="text-gray-600 mb-2">{book.description}</p>
            <p className="text-sm text-gray-500">Author: {book.author}</p>
            <p className="text-sm text-gray-500 mb-4">Price: {book.price} AZN</p>

            <button
              onClick={() => deleteBook(book._id)}
              className="bg-red-500 text-white py-2 rounded hover:bg-red-600 transition mt-auto"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Book;
