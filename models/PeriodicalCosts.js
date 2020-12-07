const dbConn = require("../services/db");
const db = dbConn.connection;
const _ = require('lodash');

const getAllPeriodicalCosts = () => {
    return db.query(`SELECT p.*, b.name, b.author as author_name FROM "PeriodicalCosts" p LEFT OUTER JOIN "Book" b ON p.book_id = b.id;`).then(allPeriodicalCosts => {
        return allPeriodicalCosts.map(periodicalCosts => {
            let totalCost = 0;
            totalCost += _.get(periodicalCosts, 'first_edition', 0);
            totalCost += _.get(periodicalCosts, 'published', 0);
            totalCost += _.get(periodicalCosts, 'royalty', 0);
            totalCost += _.get(periodicalCosts, 'author_translator_literary', 0);
            periodicalCosts.totalCost = totalCost;
            return periodicalCosts;
        })
    });
}


module.exports = {
    getAllPeriodicalCosts
};
