const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Configuração segura do banco de dados
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erro ao conectar ao Supabase:', err.stack);
  }
  console.log('Conexão com o Supabase estabelecida com sucesso!');
  release();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
