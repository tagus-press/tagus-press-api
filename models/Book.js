const dbConn = require("../services/db");
const db = dbConn.connection;

const getAllBooks = () => {
    return db.query(`SELECT b.id, b.name as name, isbn, author, bs.name as series FROM "Book" b LEFT OUTER JOIN "BookSeries" bs ON b.book_series_id = bs.id ORDER BY b.id;`);
}

const addBook = (name, isbn, author, seriesId) => {
    return db.query(`INSERT INTO "Book" (name, isbn, author, series_id) VALUES ($1, $2, $3, $4) RETURNING id`, [name, isbn, author, seriesId]);
    
}

module.exports = {
    getAllBooks,
    addBook
};
