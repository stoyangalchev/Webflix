global.__basedir = __dirname;
require("dotenv").config();
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
        origin: config.origin,
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
