const dbConn = require("../services/db");
const db = dbConn.connection;

const getAllSales = () => {
    return db.query(`SELECT b.name as book, c.name as location, s.amount, s.quantity, s.total_amount, to_char(sale_date, 'MM/DD/YYYY') as sale_date FROM "Sales" s LEFT OUTER JOIN "Book" b ON s.book_id = b.id LEFT OUTER JOIN "Center" c ON s.location_id = c.id ORDER BY s.sale_date DESC;`);
}

const addSale = (bookId, locationId, quantity, amount, totalAmount, saleDate) => {
    return db.query(`INSERT INTO "Sales" (book_id, location_id, quantity, amount, total_amount, sale_date) VALUES ($1, $2, $3, $4, $5, $6)`, [bookId, locationId, quantity, amount, totalAmount, saleDate]);
}

module.exports = {
    getAllSales,
    addSale,
};
