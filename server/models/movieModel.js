const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    plot: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true
    },
    comments: [{
        type: ObjectId,
        ref: "Comment"
    }],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Movie', movieSchema);
