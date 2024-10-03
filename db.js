const mongoose = require('mongoose');
require('dotenv').config(); // Caso você use variáveis de ambiente para o URI do MongoDB

const connectDB = async () => {
  try {
    // Conecte-se ao banco de dados usando o MongoDB URI
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB com sucesso');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); // Encerra a aplicação se não conseguir conectar ao banco
  }
};

module.exports = connectDB;
