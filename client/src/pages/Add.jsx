import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Add.css'; // Assurez-vous que ce fichier est bien au même niveau que Add.jsx

function Add() {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    publication_year: '',
    price: '',
    stock: '',
  
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (Object.values(book).some((field) => field === '')) {
      setError('All fields are required.');
      return;
    }

    try {
      await axios.post('http://localhost:8800/books', book);
      navigate('/'); // Redirection vers la page principale après succès
    } catch (err) {
      console.error('Error adding book:', err);
      setError('Failed to add the book. Please try again.');
    }
  };

  return (
    <div className="form">
      <h1>Add a Book</h1>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        {[ // Liste des champs dynamiquement générés
          { label: 'Title', name: 'title', type: 'text', placeholder: 'Add a title' },
          { label: 'Author', name: 'author', type: 'text', placeholder: 'Author name' },
          { label: 'Genre', name: 'genre', type: 'text', placeholder: 'Genre' },
          { label: 'Publication Year', name: 'publication_year', type: 'number', placeholder: 'Year' },
          { label: 'Price', name: 'price', type: 'number', placeholder: 'Price in USD' },
          { label: 'Stock', name: 'stock', type: 'number', placeholder: 'Stock quantity' },
        ].map(({ label, name, type, placeholder }) => (
          <div className="form-group" key={name}>
            <label htmlFor={name}>{label}:</label>
            <input
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              value={book[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="btn">
          Add Book
        </button>
      </form>
    </div>
  );
}

export default Add;
