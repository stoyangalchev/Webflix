const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        ref: "User"
    },
    movieId: {
        type: ObjectId,
        ref: "Movie"
    },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Comment', commentSchema);
