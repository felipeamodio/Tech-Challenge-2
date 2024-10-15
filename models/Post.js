// models/Post.js
const mongoose = require('mongoose');

// Definindo o schema de postagens
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Criando e exportando o modelo do post
const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
