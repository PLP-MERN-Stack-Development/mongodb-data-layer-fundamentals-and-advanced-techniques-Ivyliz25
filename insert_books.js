// insert_books.js - Script to populate MongoDB with sample book data

// Import MongoDB client
const { MongoClient } = require('mongodb');

// Connection URI (replace with your MongoDB connection string if using Atlas)
const uri = 'mongodb://localhost:27017';

// Database and collection names
const dbName = 'plp_bookstore';
const collectionName = 'books';

// Sample book data
const books = [
  {
    title: 'The Spanish Love Deception',
    author: 'Elena Armas',
    genre: 'Romance',
    published_year: 2021,
    price: 17.99,
    in_stock: true,
    pages: 448,
    publisher: 'Simon & Schuster'
  },
  {
    title: 'Verity',
    author: 'Colleen Hoover',
    genre: 'Psychological thriller',
    published_year: 2018,
    price: 10.99,
    in_stock: true,
    pages: 324,
    publisher: 'Grand Central Publishing'
  },
  {
    title: 'It ends with Us',
    author: 'Colleen Hoover',
    genre: 'Romance',
    published_year: 2016,
    price: 9.99,
    in_stock: true,
    pages: 376,
    publisher: 'Atria Books'
  },
  {
    title: 'It Begins with Us',
    author: 'Colleen Hoover',
    genre: 'Romance',
    published_year: 2022,
    price: 11.50,
    in_stock: false,
    pages: 336,
    publisher: 'Atria Books'
  },
  {
    title: "Archer's Voice",
    author: 'Mia Sheridan',
    genre: 'Romance',
    published_year: 2014,
    price: 14.99,
    in_stock: true,
    pages: 377,
    publisher: 'Hachette Book Group'
  },
  {
    title: 'Ugly Love',
    author: 'Colleen Hoover',
    genre: 'Romance',
    published_year: 2014,
    price: 12.99,
    in_stock: true,
    pages: 330,
    publisher: 'Atria Books'
  },
  {
    title: 'Twisted Love',
    author: 'Ana Huang',
    genre: 'Romance',
    published_year: 2021,
    price: 7.99,
    in_stock: true,
    pages: 312,
    publisher: 'Ana Huang'
  },
  {
    title: 'If we ever meet again',
    author: 'Ana Huang',
    genre: 'Romance',
    published_year: 2020,
    price: 19.99,
    in_stock: true,
    pages: 342,
    publisher: 'Ana Huang'
  },
  {
    title: '1000 Boy Kisses',
    author: 'Tillie Cole',
    genre: 'Young Adult Romance',
    published_year: 2016,
    price: 8.50,
    in_stock: false,
    pages: 320,
    publisher: 'Penguin Books Limited'
  },
  {
    title: 'Me before you',
    author: 'Jojo Moyes',
    genre: 'Romance',
    published_year: 2012,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'Pamela Dorman Books'
  },
  {
    title: 'Anna and the french kiss',
    author: 'Stephanie Perkins',
    genre: 'Young adult',
    published_year: 2010,
    price: 12.50,
    in_stock: false,
    pages: 372,
    publisher: 'Dutton Juvenile'
  },
  {
    title: 'Haunting Adeline',
    author: 'H.D Carlton',
    genre: 'Fiction',
    published_year: 2021,
    price: 9.99,
    in_stock: true,
    pages: 185,
    publisher: 'H.D Carlton'
  }
];

// Function to insert books into MongoDB
async function insertBooks() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB server');

    // Get database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Check if collection already has documents
    const count = await collection.countDocuments();
    if (count > 0) {
      console.log(`Collection already contains ${count} documents. Dropping collection...`);
      await collection.drop();
      console.log('Collection dropped successfully');
    }

    // Insert the books
    const result = await collection.insertMany(books);
    console.log(`${result.insertedCount} books were successfully inserted into the database`);

    // Display the inserted books
    console.log('\nInserted books:');
    const insertedBooks = await collection.find({}).toArray();
    insertedBooks.forEach((book, index) => {
      console.log(`${index + 1}. "${book.title}" by ${book.author} (${book.published_year})`);
    });

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

// Run the function
insertBooks().catch(console.error);

/*
 * Example MongoDB queries you can try after running this script:
 *
 * 1. Find all books:
 *    db.books.find()
 *
 * 2. Find books by a specific author:
 *    db.books.find({ author: "Colleen Hoover" })
 *
 * 3. Find books published after 2018:
 *    db.books.find({ published_year: { $gt: 2018 } })
 *
 * 4. Find books in a specific genre:
 *    db.books.find({ genre: "Romance" })
 *
 * 5. Find in-stock books:
 *    db.books.find({ in_stock: true })
 */ 