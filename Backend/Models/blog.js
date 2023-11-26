const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  likes: [{
    type: mongoose.Schema.ObjectId,
    ref: "User"
  }],
  likeCount: {
    type: Number,
    default: 0
  },
  comments:[{
    type: mongoose.Schema.ObjectId,
    ref: "User"
  }],
  commentCount:{
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});


module.exports = mongoose.model('Blog', blogSchema);

