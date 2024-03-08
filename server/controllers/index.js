const authController = require('./auth');
// const themeController = require('./themeController');
const movieController = require('./movieController');
const postController = require('./postController');
const commentController = require('./commentController')

module.exports = {
    authController,
    movieController,
    // themeController,
    postController,
    commentController
}