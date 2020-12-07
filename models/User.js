const dbConn = require("../services/db");
const db = dbConn.connection;

// Get user from email or phone number
const getUser = email => {
  let query = 'SELECT * FROM "User" WHERE email = $1;';
  return db.oneOrNone(query, [email]);
};

// Get user by id
const getUserById = id => {
  let query = 'SELECT * FROM "User" WHERE id = $1;';
  return db.one(query, [id]);
};

module.exports = {
  getUser,
  getUserById
  
};
