require("dotenv").config();

const config = {
  dbURL: process.env.DB_URL_CREDENTIALS,
  origin: ["https://webflix-jri1.onrender.com", "http://localhost:4200"],
};

module.exports = config;
