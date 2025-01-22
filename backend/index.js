const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

// Middleware pour analyser le JSON
app.use(express.json());

// Middleware pour autoriser les requêtes cross-origin
app.use(cors());

// Create connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'library'
});

// Connect to database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Test route
app.get("/", (req, res) => {
    res.send("Hello this is the library API");
});

// Get all books
app.get("/books", (req, res) => {
    const sql = 'SELECT * FROM books';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching books:', err);
            res.status(500).send('Error fetching books');
            return;
        }
        res.json(result);
    });
});

// Add a book
app.post("/books", (req, res) => {
    const { title, author, genre, publication_year, price, stock } = req.body;

    if (!title || !author || !genre || !publication_year || !price || !stock) {
        return res.status(400).send('All fields are required');
    }

    const sql = 'INSERT INTO books (title, author, genre, publication_year, price, stock) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [title, author, genre, publication_year, price, stock];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting book:', err);
            res.status(500).send('Error inserting book');
            return;
        }
        res.status(201).send('Book added successfully');
    });
});

// Start the server
app.listen(8800, () => {
    console.log('Server is running on port 8800');
});
