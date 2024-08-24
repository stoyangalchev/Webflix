require("dotenv").config();
const config = {
  // dbURL: "mongodb://localhost:27017/webflix",
  dbURL: process.env.DB_URL_CREDENTIALS,

  credentials: true,
  origin: ["https://webflix-jri1.onrender.com"],
  allowedHeaders: ["Content-Type", "X-Authorization"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};

module.exports = config;
