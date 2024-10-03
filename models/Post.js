// models/Post.js
const mongoose = require('mongoose');

// Definindo o schema de postagens
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Título é obrigatório
  },
  content: {
    type: String,
    required: true, // Conteúdo é obrigatório
  },
  author: {
    type: String,
    required: true, // Autor é obrigatório
  },
  createdAt: {
    type: Date,
    default: Date.now, // Define a data atual como padrão
  },
});

// Criando e exportando o modelo do post
const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
