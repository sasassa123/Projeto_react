# Catálogo de Jogos — CRUD Full Stack

Sistema de gerenciamento de jogos (CRUD completo) desenvolvido com React (frontend), Node.js + Express (backend) e MySQL (banco de dados).

Aluno: Felippe Matias Cardinot

---

##  Tecnologias utilizadas

- Frontend: React 19 (Vite), React Router DOM, Axios
- Backend: Node.js, Express, mysql2, CORS, dotenv
- Banco de dados: MySQL / MariaDB

---

##  Pré-requisitos

- [Node.js] (versão 18 ou superior)
- MySQL rodando localmente ( XAMPP, MySQL Server nativo, ou qualquer outro)


##  Como rodar o projeto

### 1. Banco de dados

1. Ligue o MySQL (no XAMPP, abra o painel de controle e clique em Start ao lado de MySQL).
2. Importe o arquivo `database/jogos.sql`. Você pode fazer isso de duas formas:
   - Pelo phpMyAdmin: acesse `localhost/phpmyadmin`, vá em Importar, selecione o arquivo `database/jogos.sql` e clique em Executar.
   - Pelo terminal:
     ```bash
     mysql -u root < database/jogos.sql
     ```
3. Isso vai criar o banco `crud_jogos`, a tabela `jogos` e inserir 5 jogos de exemplo.

### 2. Backend

```bash
cd backend
npm install
```

Copie o arquivo de exemplo de variáveis de ambiente:

```bash
cp .env.example .env
```

Por padrão, o `.env` já está configurado para o usuário `root` sem senha (padrão do XAMPP). Se o seu MySQL tiver senha ou usuário diferente, edite o arquivo `.env`.

Inicie o servidor:

```bash
npm start
```

O backend vai rodar em **http://localhost:3001**.

### 3. Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

O frontend vai rodar em **http://localhost:5173** (ou outra porta indicada no terminal). Abra esse endereço no navegador.

---

##  Funcionalidades

- **Listagem** de jogos com paginação (6 por página)
- **Cadastro** de novos jogos com validação de campos
- **Edição** de jogos existentes
- **Exclusão** de jogos 
- **Visualização detalhada** de cada jogo
- Tratamento de erros e mensagens para o usuário em todas as telas

---

## 🔌 Endpoints da API

| Método | Rota              | Descrição                       |
|--------|-------------------|----------------------------------|
| GET    | /api/jogos        | Lista jogos (aceita `?page=&limit=`) |
| GET    | /api/jogos/:id    | Busca um jogo específico        |
| POST   | /api/jogos        | Cria um novo jogo               |
| PUT    | /api/jogos/:id    | Atualiza um jogo existente       |
| DELETE | /api/jogos/:id    | Remove um jogo                  |

---

##  Estrutura do projeto

```
projeto-jogos/
├── backend/
│   ├── controllers/
│   │   └── jogosController.js
│   ├── routes/
│   │   └── jogosRoutes.js
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/     (Header, Footer, Aviso)
│   │   ├── pages/          (Listagem, FormularioJogo, DetalheJogo)
│   │   ├── services/       (api.js)
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── database/
    └── jogos.sql
```

---

##  Solução de problemas comuns

- **Erro "ECONNREFUSED" no frontend:** o backend não está rodando, ou está em outra porta. Confira se `npm start` está ativo em `backend/`.
- **Erro de acesso ao banco:** confira usuário/senha no arquivo `backend/.env`.
- **Tela em branco:** confira se rodou `npm install` tanto no `backend/` quanto no `frontend/`.
