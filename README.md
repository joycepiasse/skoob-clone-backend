# 📚 Skoob Clone – Backend

API desenvolvida em **Node.js + TypeScript**, utilizando **Prisma ORM** com **MySQL (Docker)**, responsável pelo gerenciamento de usuários e autenticação com JWT.

Este projeto simula o backend de uma aplicação de gerenciamento de livros inspirada no Skoob.


## 🚀 Tecnologias
- Node.js
- Express
- TypeScript
- Prisma ORM
- MySQL
- bcrypt
- JSON Web Token (JWT)
- Docker


## 📂 Estrutura do projeto

```bash
.
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── routes/
│   │   └── index.ts
│   ├── app.ts
│   └── server.ts
├── docker-compose.yml
├── prisma.config.ts
├── tsconfig.json
├── package.json
└── README.md
```


## ⚙️ Configuração do Ambiente

1. Clone o repositório
2. Suba o banco de dados com Docker:

```bash
docker compose up -d
```

3. Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="mysql://root:root@localhost:3307/skoob_clone"
JWT_SECRET=seu_segredo_aqui
```

4. Execute as migrations:

```bash
npx prisma migrate dev
```


## ▶️ Executando o Projeto

```bash
npm install
npm run dev
```

Servidor disponível em:

http://localhost:3000


## 🔍 Funcionalidades Implementadas

- Criação de usuário
- Validação de campos obrigatórios
- Tratamento de duplicidade (username e email)
- Hash de senha com bcrypt
- Integração com banco relacional via Prisma ORM
- Ambiente isolado com Docker


## 🧪 Testes

As rotas podem ser testadas utilizando Thunder Client ou Postman.