const { userModel, themeModel, commentModel, movieModel  } = require('../models/');

function newComment(text, userId, movieId) {
    return commentModel.create({ text, userId, movieId })
        .then(comment => {
            return  movieModel.findByIdAndUpdate({ _id: movieId }, {$push: { comments: comment._id }})   
        })
}

// function getLatestsPosts(req, res, next) {
//     const limit = Number(req.query.limit) || 0;

//     postModel.find()
//         .sort({ created_at: -1 })
//         .limit(limit)
//         .populate('themeId userId')
//         .then(posts => {
//             res.status(200).json(posts)
//         })
//         .catch(next);
// }

function createComment(req, res, next) {
    const { movieId } = req.params;
    const { _id: userId } = req.user;
    const { text } = req.body;

    newComment(text, userId, movieId)
        .then((updatedTheme) => res.status(200).json(updatedTheme))
        .catch(next);
}

function getComments(req, res, next) {
    const { movieId } = req.params;
    return commentModel.find({movieId: movieId})
    .populate("userId")
    .then(comments=> res.status(200).json(comments))
    .catch(next)
}

// function editPost(req, res, next) {
//     const { postId } = req.params;
//     const { postText } = req.body;
//     const { _id: userId } = req.user;

//     // if the userId is not the same as this one of the post, the post will not be updated
//     postModel.findOneAndUpdate({ _id: postId, userId }, { text: postText }, { new: true })
//         .then(updatedPost => {
//             if (updatedPost) {
//                 res.status(200).json(updatedPost);
//             }
//             else {
//                 res.status(401).json({ message: `Not allowed!` });
//             }
//         })
//         .catch(next);
// }

// function deletePost(req, res, next) {
//     const { postId, themeId } = req.params;
//     const { _id: userId } = req.user;

//     Promise.all([
//         postModel.findOneAndDelete({ _id: postId, userId }),
//         userModel.findOneAndUpdate({ _id: userId }, { $pull: { posts: postId } }),
//         themeModel.findOneAndUpdate({ _id: themeId }, { $pull: { posts: postId } }),
//     ])
//         .then(([deletedOne, _, __]) => {
//             if (deletedOne) {
//                 res.status(200).json(deletedOne)
//             } else {
//                 res.status(401).json({ message: `Not allowed!` });
//             }
//         })
//         .catch(next);
// }

// function like(req, res, next) {
//     const { postId } = req.params;
//     const { _id: userId } = req.user;

//     console.log('like')

//     postModel.updateOne({ _id: postId }, { $addToSet: { likes: userId } }, { new: true })
//         .then(() => res.status(200).json({ message: 'Liked successful!' }))
//         .catch(next)
// }

module.exports = {
    // getLatestsPosts,
    // newPost,
    createComment,
    getComments,
    // editPost,
    // deletePost,
    // like,
}
