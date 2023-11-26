const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Blog"
    },
    content: {
        type: String,
        required: [true, "Please provide a content"],
        minlength: [3, " Please provide a content least 3 characters"]
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    likeCount: {
        type: Number,
        default: 0
    }
});


module.exports = mongoose.model('Comment', commentSchema);

