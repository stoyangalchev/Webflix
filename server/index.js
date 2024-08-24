const dbConnector = require("./config/db");
const apiRouter = require("./router");
const cors = require("cors");
const { errorHandler } = require("./utils");

dbConnector()
  .then(() => {
    const config = require("./config/config");

    const app = require("express")();
    require("./config/express")(app);

   app.use(
     cors({
       origin: ["https://webflix-jri1.onrender.com", "http://localhost:4200"],
       credentials: true,
       methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
       allowedHeaders: ["Content-Type", "X-Authorization"],
     })
   );

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
