const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { movieController, postController, commentController } = require('../controllers');

// middleware that is specific to this router

router.get('/', movieController.getMovies);
router.get('/latest', movieController.getLatestsMovies);
router.post('/', auth(), movieController.createMovie);

router.get('/:movieId', movieController.getMovie);
router.post('/:movieId/delete',auth(), movieController.deleteMovie);
router.post('/:movieId/edit', auth(), movieController.editMovie);
router.post('/:movieId/comments', auth(), commentController.createComment);
router.get('/:movieId/comments', commentController.getComments);
router.put('/:movieId/comments/:postId', auth(), postController.editPost);
router.delete('/:themeId/posts/:postId', auth(), postController.deletePost);

// router.get('/my-trips/:id/reservations', auth(), themeController.getReservations);

module.exports = router