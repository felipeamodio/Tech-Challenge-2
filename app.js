const express = require('express');
const connectDB = require('./db'); // Importa a função para conectar ao MongoDB
const postRoutes = require('./routes/posts'); // Rotas dos posts
const app = express();

// Conectando ao banco de dados MongoDB
connectDB();

// Middleware para permitir JSON
app.use(express.json());

// Roteamento
app.use('/api', postRoutes); // Aqui você adiciona as rotas dos posts

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
