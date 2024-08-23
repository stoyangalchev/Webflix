require("dotenv").config();
const config = {
  // dbURL: "mongodb://localhost:27017/webflix",
  dbURL: process.env.DB_URL_CREDENTIALS,

  origin: ["*"],
};

module.exports = config;
