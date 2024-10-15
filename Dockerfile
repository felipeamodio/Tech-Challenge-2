FROM node:16

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de package.json e package-lock.json antes, para aproveitar o cache do Docker
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Expondo a porta para o container
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "app.js"]
