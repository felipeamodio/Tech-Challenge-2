const express = require('express');
const connectDB = require('./db');
const postRoutes = require('./routes/posts'); // Rotas dos posts
const app = express();

// Conectando ao banco de dados MongoDB
connectDB();

// Middleware para permitir JSON
app.use(express.json());

// Rotas
app.use('/api', postRoutes); 

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
