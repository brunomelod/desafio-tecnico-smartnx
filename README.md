# Teste Técnico Smartnx [JavaScript]

API REST em Node.js com cadastro/login de usuários (MongoDB), CRUD de posts e comentários (PostgreSQL), autenticação JWT e ambiente dockerizado.

---

## Tecnologias

- **Node.js** + Express
- **MongoDB** (Mongoose) — autenticação (usuários, login)
- **PostgreSQL** (Sequelize) — posts e comentários
- **JWT** — autenticação nas rotas protegidas
- **Docker** — Postgres + MongoDB + aplicação

---

## Dependências

| Pacote                 | Versão | Uso                                     |
| ---------------------- | ------- | --------------------------------------- |
| **express**      | ^5.2.1  | Servidor HTTP e rotas da API            |
| **mongoose**     | ^9.1.5  | MongoDB — usuários e autenticação   |
| **sequelize**    | ^6.37.7 | PostgreSQL — posts e comentários      |
| **pg**           | ^8.17.2 | Driver PostgreSQL                       |
| **bcrypt**       | ^6.0.0  | Hash de senha no cadastro/login         |
| **jsonwebtoken** | ^9.0.3  | Geração e validação do JWT          |
| **dotenv**       | ^17.2.3 | Carregamento das variáveis de ambiente |

---

## Pré-requisitos

- Node.js 18+
- MongoDB (local, Atlas ou via Docker)
- PostgreSQL (local ou via Docker)

---

## Variáveis de ambiente

Copie o `.env.example` para `.env` e preencha os valores:

```bash
cp .env.example .env
```

| Variável               | Descrição                          |
| ----------------------- | ------------------------------------ |
| `PORT`                | Porta do servidor (ex.: 3000)        |
| `MONGODB_URI`         | URI de conexão MongoDB              |
| `JWT_SECRET`          | Chave secreta para assinatura do JWT |
| `JWT_EXPIRATION_TIME` | Validade do token (ex.: 1h)          |
| `PG_HOST`             | Host do PostgreSQL                   |
| `PG_PORT`             | Porta do PostgreSQL                  |
| `PG_USER`             | Usuário do PostgreSQL               |
| `PG_PASSWORD`         | Senha do PostgreSQL                  |
| `PG_DATABASE`         | Nome do banco PostgreSQL             |

### Observações (Docker vs Local)

- **Docker (recomendado)**:

  - Por padrão, o `.env.example` já aponta o Mongo para o container: `MONGODB_URI=mongodb://mongo:27017/smartnx_auth`.
  - As variáveis do Postgres **não precisam estar no `.env`**, porque o `docker-compose.yml` já injeta as variáveis `PG_*` no serviço `app` (ex.: `PG_HOST=postgres`).
- **Local (sem Docker)**:

  - Ajuste o `MONGODB_URI` para seu Mongo local/Atlas (ex.: `mongodb://localhost:27017/smartnx_auth` ou `mongodb+srv://...`).
  - No `.env.example`, as variáveis `PG_*` ficam **comentadas**; se for rodar localmente, **descomente** e preencha com os dados do seu Postgres local.

### Gerando o `JWT_SECRET`

Para gerar um secret seguro, use:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copie a saída e defina em `JWT_SECRET` no `.env`.

---

## Execução

> Recomendado: rodar via **Docker Compose** (sobe app + Postgres + MongoDB).

### Local

1. Instale as dependências:

```bash
npm install
```

2. Configure o `.env` (MongoDB, Postgres, JWT, etc.).
3. Certifique-se de que o MongoDB e o PostgreSQL estão rodando.
4. Inicie a aplicação:

```bash
node server.js
```

O servidor sobe na porta definida em `PORT` (padrão 3000).

### Docker

Com **Docker** e **Docker Compose** instalados:

```bash
docker compose up --build -d
```

- **Postgres**: porta `5432`
- **MongoDB**: porta `27017`
- **App**: porta `3000`

O `docker-compose` usa o `.env`, mas sobrescreve no container da aplicação:

- `PG_HOST=postgres` (conecta no Postgres do compose)
- `MONGODB_URI=mongodb://mongo:27017/smartnx_auth` (conecta no Mongo do compose)

Se você for executar **localmente (sem Docker)**, ajuste o `.env` para apontar `MONGODB_URI` para seu MongoDB local/Atlas e configure as variáveis `PG_*` para seu Postgres local.

Para parar:

```bash
docker compose down
```

---

## Endpoints

| Método    | Rota                | Descrição                                             | Auth         |
| ---------- | ------------------- | ------------------------------------------------------- | ------------ |
| `POST`   | `/api/users/register` | Cadastro de usuário                                    | Não         |
| `POST`   | `/api/auth/login`     | Login (retorna JWT)                                     | Não         |
| `POST`   | `/api/posts`          | Criar post                                              | Sim (Bearer) |
| `GET`    | `/api/posts`          | Listar posts                                            | Sim (Bearer) |
| `PUT`    | `/api/posts/:id`      | Atualizar post                                          | Sim (Bearer) |
| `DELETE` | `/api/posts/:id`      | Excluir post                                            | Sim (Bearer) |
| `POST`   | `/api/comments`       | Adicionar comentário (`postId`, `content` no body) | Sim (Bearer) |
| `DELETE` | `/api/comments/:id`   | Excluir comentário                                     | Sim (Bearer) |

Rotas protegidas exigem o header `Authorization: Bearer <token>`.

---

## Exemplos de Uso

### 1. Registrar um novo usuário

```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "username": "joao",
    "password": "senha123"
  }'
```

**Resposta esperada:**

```json
{
  "message": "Usuário criado com sucesso",
  "user": {
    "username": "joao",
    "name": "João Silva"
  }
}
```

### 2. Fazer login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "joao",
    "password": "senha123"
  }'
```

**Resposta esperada:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWFiY2RlZjEyMzQ1Njc4OTBhYmNkZSIsImlhdCI6MTczODI0MzIwMCwiZXhwIjoxNzM4MjQ2ODAwfQ.abc123...",
  "user": {
    "username": "joao",
    "name": "João Silva"
  }
}
```

> **Nota:** Copie o valor do `token` retornado para usar nos próximos exemplos.

### 3. Criar um post (requer autenticação)

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "title": "Meu Primeiro Post",
    "content": "Este é o conteúdo do meu post sobre Node.js"
  }'
```

**Resposta esperada:**

```json
{
  "id": 1,
  "title": "Meu Primeiro Post",
  "content": "Este é o conteúdo do meu post sobre Node.js",
  "userId": "679abcdef1234567890abcde",
  "createdAt": "2026-01-29T10:30:00.000Z",
  "updatedAt": "2026-01-29T10:30:00.000Z"
}
```

### 4. Listar todos os posts

```bash
curl -X GET http://localhost:3000/api/posts \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Resposta esperada:**

```json
[
  {
    "id": 1,
    "title": "Meu Primeiro Post",
    "content": "Este é o conteúdo do meu post sobre Node.js",
    "userId": "679abcdef1234567890abcde",
    "createdAt": "2026-01-29T10:30:00.000Z",
    "updatedAt": "2026-01-29T10:30:00.000Z"
  }
]
```

### 5. Atualizar um post

```bash
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "title": "Post Atualizado",
    "content": "Conteúdo modificado"
  }'
```

### 6. Adicionar comentário a um post

```bash
curl -X POST http://localhost:3000/api/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "postId": 1,
    "content": "Ótimo post! Muito informativo."
  }'
```

**Resposta esperada:**

```json
{
  "id": 1,
  "content": "Ótimo post! Muito informativo.",
  "postId": 1,
  "userId": "679abcdef1234567890abcde",
  "createdAt": "2026-01-29T10:35:00.000Z",
  "updatedAt": "2026-01-29T10:35:00.000Z"
}
```

### 7. Deletar um comentário

```bash
curl -X DELETE http://localhost:3000/api/comments/1 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Resposta esperada:** Status `204 No Content`

### 8. Deletar um post

```bash
curl -X DELETE http://localhost:3000/api/posts/1 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Resposta esperada:** Status `204 No Content`

---

## Observações

- ✅ Todos os requisitos obrigatórios implementados
- ✅ Requisitos PLUS implementados (Docker + MongoDB para autenticação)
- ✅ Arquitetura híbrida: MongoDB (usuários) + PostgreSQL (posts/comentários)
- ✅ JWT com expiração de 1 hora
- ✅ Senhas armazenadas com hash bcrypt
- ✅ Middleware de autenticação validando token em todas as rotas protegidas
