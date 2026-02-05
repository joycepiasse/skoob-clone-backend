# 📚 Skoob Clone – Backend

Backend da aplicação **Skoob Clone**, desenvolvido em Node.js com TypeScript,
responsável pelo gerenciamento de usuários e autenticação.

## 🚀 Tecnologias
- Node.js
- Express
- TypeScript
- bcrypt
- JSON Web Token (JWT)

## 📂 Estrutura do projeto

src/
 ├── app.ts
 ├── server.ts
 └── routes/
     └── index.ts

## ⚙️ Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto com a seguinte variável:

JWT_SECRET=seu_segredo_aqui

> ⚠️ O arquivo `.env` não é versionado por segurança.

## ▶️ Como rodar o projeto

npm install  
npm run dev  

Servidor disponível em:

http://localhost:3000

## 🧪 Testes
As rotas podem ser testadas utilizando o Thunder Client no VS Code.