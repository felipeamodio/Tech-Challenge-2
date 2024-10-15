const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); 

// Lista de Posts 
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar posts', error });
  }
});

// Busca de posts por palavra-chave 
router.get('/posts/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Termo de busca não fornecido' });
  }

  try {
    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
      ],
    });

    if (posts.length === 0) {
      return res.status(404).json({ message: 'Nenhum post encontrado' });
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar posts', error });
  }
});

// Leitura de Post por ID
router.get('/posts/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter o post', error });
  }
});


// Criação de Post 
router.post('/posts', async (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ message: 'Preencha todos os campos obrigatórios' });
  }

  try {
    const newPost = new Post({
      title,
      content,
      author,
    });
    await newPost.save(); // Salva o novo post
    res.status(201).json(newPost); // Retorna o post criado
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o post', error });
  }
});

// Edição de postagens 
router.put('/posts/:id', async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    // Atualiza os campos que foram fornecidos
    post.title = title || post.title;
    post.content = content || post.content;
    post.author = author || post.author;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o post', error });
  }
});

// Exclusão de postagens 
router.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }
    res.status(200).json({ message: 'Post excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir o post', error });
  }
});



module.exports = router;
