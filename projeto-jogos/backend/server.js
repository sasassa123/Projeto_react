const express = require('express');
const cors = require('cors');
require('dotenv').config();

const jogosRoutes = require('./routes/jogosRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/jogos', jogosRoutes);

app.get('/', (req, res) => {
  res.json({ mensagem: 'API rodando Aluno: Felippe Matias Cardinot' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
