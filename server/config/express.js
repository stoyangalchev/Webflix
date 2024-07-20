const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSecret = process.env.COOKIESECRET || 'SoftUni';
// const { errorHandler } = require('../utils')

module.exports = (app) => {
    app.use(express.json());

    app.use(cookieParser(cookieSecret));

    app.use(express.static(path.resolve(__basedir, 'static')));

      const port = process.env.PORT || 3000;
      app.listen(port, "0.0.0.0", () => {
        console.log(`Server running at http://localhost:${port}/`);
      });
    // app.use(errorHandler(err, req, res, next));
};
