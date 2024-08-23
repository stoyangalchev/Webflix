const mongoose = require("mongoose");
const config = require("./config");

module.exports = async () => {
  try {
    await mongoose.connect(config.dbURL);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
