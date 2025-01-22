import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Books.css';

function Books() {
  const [books, setBooks] = useState([]);

  // Récupération des livres depuis l'API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8800/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  // Suppression d'un livre
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.book_id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="books-container">
      <header className="books-header">
        <h1>Books</h1>
        <button className="btn add-btn">
          <Link to="/add">Add a Book</Link>
        </button>
      </header>

      <div className="books-grid">
        {books.map((book) => (
          <div key={book.book_id} className="book-card">
            {/* Image du livre */}
            <img
              src={book.image_url || '/default-book.jpg'} // URL par défaut si l'image est manquante
              alt={book.title}
              className="book-image"
            />
            {/* Détails du livre */}
            <h2 className="book-title">{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Publication Year:</strong> {book.publication_year}</p>
            <p><strong>Price:</strong> ${book.price}</p>
            <p><strong>Stock:</strong> {book.stock}</p>

            {/* Boutons d'action */}
            <div className="action-buttons">
              <button
                className="btn update-btn"
                onClick={() => window.alert(`Update book with ID: ${book.book_id}`)}
              >
                Update
              </button>
              <button
                className="btn delete-btn"
                onClick={() => handleDelete(book.book_id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
