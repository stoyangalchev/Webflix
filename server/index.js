global.__basedir = __dirname;

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const apiRouter = require("./router");
const { errorHandler } = require("./utils");

const config = {
  dbURL: process.env.DB_URL_CREDENTIALS,
  origin: ["https://webflix-jri1.onrender.com", "http://localhost:4200"],
};

const dbConnector = async () => {
  try {
    await mongoose.connect(config.dbURL);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

dbConnector()
  .then(() => {
    const app = express();

    // Express configuration
    app.use(express.json());
    app.use(cookieParser(process.env.COOKIESECRET || "SoftUni"));
    app.use(express.static(path.resolve(__basedir, "static")));

    // CORS configuration
    app.use(
      cors({
        origin: config.origin,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "X-Authorization"],
      })
    );

    // Middleware to catch CORS errors
    app.use((err, req, res, next) => {
      if (err && err.name === "CorsError") {
        console.error("CORS error:", err.message);
        res.status(500).json({ message: "CORS error", error: err.message });
      } else {
        next(err);
      }
    });

    app.use("/", apiRouter);

    app.use(errorHandler);
    app.get("/", (req, res) => {
      res.send("<h1>Server is Online /</h1>");
    });

    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000/");
    });
  })
  .catch(console.error);
