const { movieModel, userModel } = require('../models');
const { newPost } = require('./postController')

function getMovies(req, res, next) {
    movieModel.find()
        .then(movies => res.json(movies))
        .catch(next);
}

function getMovie(req, res, next) {
    const { movieId } = req.params;

    movieModel.findById(movieId)
        .populate({
            path: 'comments',
            populate: {
                path: 'userId'
            }
        })
        .then(movie => res.json(movie))
        .catch(next);
}

function getLatestsMovies(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    movieModel.find()
        .sort({ created_at: -1 })
        .limit(limit)
        .then(movies => {
            res.status(200).json(movies)
        })
        .catch(next);
}

function createMovie(req, res, next) {
    const { title, director, genre, year, imageUrl, plot } = req.body;
    const { _id: userId } = req.user;

    movieModel.create({ title, director, genre, year, imageUrl, plot, ownerId: userId })
        .then((movie)=>{
            userModel.findOneAndUpdate({ _id: userId }, { $push: { movies: movie._id } })
            .then(updatedUser=> res.status(200).json(updatedUser))
        })
        // .then(movie => {
        //     res.status(200).json(movie);
        //     // userModel.findOneAndUpdate({ _id: userId }, { $push: { movies: movie._id } })
        //     // .then(updatedUser=> res.status(200).json(updatedUser))
        // })
        .catch(next);
}

function editMovie(req, res, next) {
    const { movieId } = req.params;
    const { title, director, genre, year, imageUrl, plot } = req.body;
    const { _id: ownerId } = req.user;

    // if the userId is not the same as this one of the post, the post will not be updated
    movieModel.findOneAndUpdate({ _id: movieId, ownerId }, { title, director, genre, year, imageUrl, plot }, { new: true })
        .then(updatedMovie => {
            if (updatedMovie) {
                res.status(200).json(updatedMovie);
            }
            else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function deleteMovie(req, res, next) {
    const { movieId } = req.params;
    const { _id: ownerId } = req.user;

    Promise.all([
        movieModel.findOneAndDelete({ _id: movieId, ownerId }),
        userModel.findOneAndUpdate({ _id: ownerId }, { $pull: { movies: movieId } }),
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

// function subscribe(req, res, next) {
//     const themeId = req.params.themeId;
//     const { _id: userId } = req.user;
//     themeModel.findByIdAndUpdate({ _id: themeId }, { $addToSet: { subscribers: userId } }, { new: true })
//         .then(updatedTheme => {
//             res.status(200).json(updatedTheme)
//         })
//         .catch(next);
// }

module.exports = {
    getMovies,
    createMovie,
    getMovie,
    // subscribe,
    editMovie,
    deleteMovie,
    getLatestsMovies
}
