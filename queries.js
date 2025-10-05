// queries.js – MongoDB CRUD, Advanced Queries, Aggregations & Indexing
require('dotenv').config();
const { MongoClient } = require("mongodb");

async function runQueries() {
  const uri =process.env.MONGODB_URI || "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    //BASIC CRUD OPERATIONS
   // 1. Find all books in a specific genre
    const fictionBooks = await books.find({ genre: "Fiction" }).toArray();
    console.log("\n📚 Fiction Books:");
    console.log(fictionBooks);

    // 2. Find books published after a certain year
    const recentBooks = await books.find({ published_year: { $gt: 1950 } }).toArray();
    console.log("\n📖 Books published after 1950:");
    console.log(recentBooks);

    // 3. Find books by a specific author
    const orwellBooks = await books.find({ author: "George Orwell" }).toArray();
    console.log("\n🧑‍💻 Books by George Orwell:");
    console.log(orwellBooks);

    // 4. Update the price of a specific book
    const updateResult = await books.updateOne(
      { title: "The Great Gatsby" },
      { $set: { price: 12.99 } }
    );
    console.log(`\n💲 Updated ${updateResult.modifiedCount} book's price`);

    // 5. Delete a book by title
    const deleteResult = await books.deleteOne({ title: "Moby Dick" });
    console.log(`\n🗑️ Deleted ${deleteResult.deletedCount} book(s)`);


    //ADVANCED QUERIES
    // 6. Books that are in stock and published after 2010
    const modernInStock = await books
      .find({ in_stock: true, published_year: { $gt: 2010 } })
      .project({ title: 1, author: 1, price: 1, _id: 0 })
      .toArray();
    console.log("\n📘 In-stock books published after 2010 (title, author, price):");
    console.log(modernInStock);

    // 7. Sort by price ascending
    const sortedAsc = await books.find().sort({ price: 1 }).toArray();
    console.log("\n⬆️ Books sorted by price (ascending):");
    console.log(sortedAsc);

    // 8. Sort by price descending
    const sortedDesc = await books.find().sort({ price: -1 }).toArray();
    console.log("\n⬇️ Books sorted by price (descending):");
    console.log(sortedDesc);

    // 9. Pagination – 5 books per page
    const page = 1; // change to 2, 3, etc. to view other pages
    const perPage = 5;
    const paginated = await books
      .find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .toArray();
    console.log(`\n📄 Page ${page} of books:`);
    console.log(paginated);

    //AGGREGATION PIPELINES
    // 10. Average price of books by genre
    const avgPriceByGenre = await books
      .aggregate([
        { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } },
        { $sort: { avgPrice: -1 } }
      ])
      .toArray();
    console.log("\n💰 Average price of books by genre:");
    console.log(avgPriceByGenre);

    // 11. Author with the most books
    const topAuthor = await books
      .aggregate([
        { $group: { _id: "$author", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 }
      ])
      .toArray();
    console.log("\n🏆 Author with the most books:");
    console.log(topAuthor);

    // 12. Group books by publication decade and count them
    const booksByDecade = await books
      .aggregate([
        {
          $project: {
            decade: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] }
          }
        },
        { $group: { _id: "$decade", totalBooks: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ])
      .toArray();
    console.log("\n📊 Number of books by publication decade:");
    console.log(booksByDecade);

    //INDEXING
    // 13. Create an index on the title field
    const titleIndex = await books.createIndex({ title: 1 });
    console.log(`\n⚙️ Created index: ${titleIndex}`);

    // 14. Create a compound index on author and published_year
    const compoundIndex = await books.createIndex({ author: 1, published_year: 1 });
    console.log(`⚙️ Created compound index: ${compoundIndex}`);

    // 15. Use explain() to check query performance with index
    const explainOutput = await books
      .find({ title: "The Hobbit" })
      .explain("executionStats");
    console.log("\n🔍 Query performance (explain):");
    console.log(JSON.stringify(explainOutput.executionStats, null, 2));

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
    console.log("\nConnection closed");
  }
}

runQueries();
