require('dotenv').config()
const config = {
  // dbURL: "mongodb://localhost:27017/webflix",
  dbURL: process.env.DB_URL_CREDENTIALS,

  origin: ["http://localhost:3001", "http://localhost:4200"],
};

module.exports = config;
