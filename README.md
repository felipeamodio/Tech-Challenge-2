
# Documentação da API de Blogging

  

## Visão geral

Esta API foi criada para permitir que professores publiquem e compartilhem aulas com os alunos em uma plataforma centralizada. O back-end foi desenvolvido com Node.js e Express, e os dados são armazenados em um banco de dados MongoDB. A aplicação foi containerizada com Docker e conta com automação CI/CD usando GitHub Actions.

  
  

# Estrutura da Aplicação

  

-  **Node.js**: Utilizado para construir o servidor de back-end.

-  **Express**: Framework para lidar com roteamento e middleware.

-  **MongoDB**: Banco de dados NoSQL utilizado para armazenar os posts.

-  **Mongoose**: Biblioteca para conectar e manipular o MongoDB com o Node.js.

-  **Docker**: Para containerização e garantir consistência nos ambientes de desenvolvimento e produção.

-  **GitHub Actions**: Configurado para automação de testes e deploy.

  

## Configuração do Ambiente

### Requisitos

  

-  **Node.js** (v16 ou superior)

-  **Docker** e **Docker Compose**

  

### Configuração do Projeto

1.  **Clone o repositório**:

`git clone https://github.com/felipeamodio/Tech-Challenge-2`

`cd Tech-Challenge-2`

2.  **Instale as dependências**:

`npm install`

3. Crie um arquivo `.env` com a variável de ambiente necessária para conexão ao MongoDB (não precisa se estiver usando Docker).

4.  **Executando com Docker**:

- Construa e inicie os containers:

`docker-compose up --build`

- A API estará disponível em `http://localhost:3000/api`.

  

## Estrutura das Rotas

  

### Base URL

-  `http://localhost:3000/api`

  

### Endpoints

1.  **Listar todos os Posts**

-  **URL**: `/posts`

-  **Método**: `GET`

-  **Descrição**: Retorna uma lista de todos os posts.

-  **Resposta de Sucesso:**

**Status**: 200

**Exemplo de Corpo da Resposta**:

```

[

{

"_id": "66fde7c76f72429c5153429a",

"title": "Post Atualizado Novo",

"content": "Conteúdo atualizado do post.",

"author": "Professor Felipe Alves",

"createdAt": "2024-10-03T00:39:35.803Z",

"__v": 0

}

]

```

2.  **Buscar Posts por Palavra-Chave**

-  **URL**: `/posts/search`

-  **Método**: `GET`

-  **Parâmetro de Query**: `term` - palavra a ser buscada no título ou conteúdo do post.

-  **Descrição**: Busca posts que contenham a palavra-chave fornecida no título ou conteúdo.

-  **Resposta de Sucesso:**

**Status**: 200

**Exemplo de Corpo da Resposta**:

```

[

{

"_id": "66fde8226f72429c5153429d",

"title": "Post 2",

"content": "Prova na segunda",

"author": "Professora Camila",

"createdAt": "2024-10-03T00:41:06.826Z",

"__v": 0

}

]

```

-  **Erro**:

**Status**: 400 se `term` estiver ausente ou não definido

**Exemplo de Corpo de Erro**:

```

{ "message": "Parâmetro de busca \"term\" é obrigatório" }

```

  

3.  **Ler um Post por ID**

-  **URL**: `/posts/:id`

-  **Método**: `GET`

-  **Parâmetro de URL**: `id` - o ID do post.

-  **Descrição**: Retorna um post específico pelo ID.

-  **Resposta de Sucesso:**

**Status**: 200

**Exemplo de Corpo da Resposta**:

```

{

"_id": "66fde7c76f72429c5153429a",

"title": "Post Atualizado Novo",

"content": "Conteúdo atualizado do post.",

"author": "Professor Felipe Alves",

"createdAt": "2024-10-03T00:39:35.803Z",

"__v": 0

}

```

-  **Erro**:

**Status**: 404 se o post não for encontrado

**Status**: 400 se o ID for inválido

  

4.  **Criar um Novo Post**

-  **URL**: `/posts`

-  **Método**: `POST`

-  **Corpo da requisição**:

```

{

"title": "Título do Post",

"content": "Conteúdo do post.",

"author": "Nome do Autor"

}

```

-  **Descrição**: Cria uma nova postagem.

-  **Resposta de Sucesso**:

**Status**: 201

**Exemplo de Corpo da Resposta**:

```

{

"_id": "66fde7c76f72429c5153429a",

"title": "Título do Post",

"content": "Conteúdo do post.",

"author": "Nome do Autor",

"createdAt": "2024-10-03T00:39:35.803Z",

"__v": 0

}

```

  

5.  **Editar um Post Existente**

-  **URL**: `/posts/:id`

-  **Método**: `PUT`

-  **Parâmetro de URL**: `id` - o ID do post.

-  **Corpo da requisição (parâmetros opcionais)**:

```

{

"title": "Novo Título",

"content": "Novo Conteúdo",

"author": "Novo Autor"

}

```

-  **Descrição**: Atualiza o título, conteúdo e/ou autor de um post específico.

-  **Resposta de Sucesso**:

**Status**: 200

**Exemplo de Corpo da Resposta**:

```

{

"_id": "66fde7c76f72429c5153429a",

"title": "Novo Título",

"content": "Novo Conteúdo",

"author": "Novo Autor",

"createdAt": "2024-10-03T00:39:35.803Z",

"__v": 0

}

```

  

6.  **Excluir um Post**

-  **URL**: `/posts/:id`

-  **Método**: `DELETE`

-  **Parâmetro de URL**: `id` - o ID do post.

-  **Descrição**: Remove um post específico do banco de dados.

-  **Resposta de Sucesso**:

**Status**: 200

**Exemplo de Corpo da Resposta**:

```

{ "message": "Post excluído com sucesso" }

```

  

## Testes

  

Para garantir a estabilidade da aplicação, você pode escrever testes unitários para cada endpoint utilizando frameworks de teste, como Jest .

  

## Automação com GitHub Actions

  

A CI/CD foi configurada no arquivo `.github/workflows/ci.yml` para automação de testes e deploy. Sempre que uma atualização for feita no repositório, o GitHub Actions executará os testes automaticamente.

  

## Considerações Finais



Esta API permite a criação, edição, exclusão e busca de posts, cumprindo os requisitos para uma aplicação de blogging dinâmica. Através da documentação e estrutura de código bem organizada, a escalabilidade e a manutenção do sistema são facilitadas.