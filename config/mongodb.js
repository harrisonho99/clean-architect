/**
 * @namespace
 * @property {string} host
 * @property {string} username
 * @property {string} password
 */
const MongoDBDriver = {
  URI: process.env.DB_URI,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
};

module.exports = { MongoDBDriver };
