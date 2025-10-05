📚 MongoDB Data Layer – Fundamentals and Advanced Techniques
🧠 Overview

This project demonstrates how to:

Connect to MongoDB using Node.js

Populate a database with sample data

Perform CRUD operations

Run advanced queries, aggregation pipelines, and indexing

It’s built using the MongoDB Node.js Driver and uses dotenv for environment configuration.

⚙️ Requirements

Before running the scripts, make sure you have:

Node.js installed (v16 or higher)

MongoDB installed and running locally on mongodb://localhost:27017

Internet connection (optional if using MongoDB Atlas)

📦 Installation Steps

Clone or download this folder

cd mongodb-data-layer-fundamentals-and-advanced-techniques-Ivyliz25


Initialize npm (if not already done)

npm init -y


Install dependencies

npm install mongodb dotenv


Create a .env file in the project root:

MONGODB_URI=mongodb://localhost:27017

🗃️ Step 1 – Insert Sample Data

Run the following command to populate your MongoDB database with sample books:

node insert_books.js


This will:

Connect to the plp_bookstore database

Drop the existing books collection (if it exists)

Insert 12 sample book documents

Print the inserted data in your terminal

✅ Example output:

Connected to MongoDB server
Collection dropped successfully
12 books were successfully inserted into the database
Connection closed

🔍 Step 2 – Run Queries and Aggregations

After inserting the data, run:

node queries.js


This script demonstrates:

Basic CRUD (Create, Read, Update, Delete)

Advanced queries (sorting, filtering, pagination)

Aggregation pipelines (grouping, averages)

Indexing and query performance inspection

✅ Example output:

Connected to MongoDB
📚 Fiction Books:
[ { title: "Haunting Adeline", ... } ]
💰 Average price of books by genre:
[ { _id: "Romance", avgPrice: 12.24 }, ... ]
🏆 Author with the most books:
[ { _id: "Colleen Hoover", count: 3 } ]
Connection closed

📘 Folder Structure
mongodb-data-layer-fundamentals-and-advanced-techniques-Ivyliz25/
├── insert_books.js       # Seeds MongoDB with book data
├── queries.js            # Performs queries, aggregations, and indexing
├── .env                  # Stores MongoDB connection URI
├── package.json
└── README.md

🧹 Troubleshooting

Error: Cannot find module 'dotenv'
➡ Run npm install dotenv

Error: MongoDB not running
➡ Start your MongoDB server:

mongod


To verify your database:
Open MongoDB shell or Compass and run:

show dbs
use plp_bookstore
show collections
db.books.find()

✨ Author

Ivy Liz
PLP Software Engineering – Full Stack MERN Track (Week 1 Assignment)