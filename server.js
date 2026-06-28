const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const app = express();

// O Render define a porta automaticamente na variável process.env.PORT. Se não houver, usa a 3000.
const PORT = process.env.PORT || 3000;

// Configuração da conexão segura com o Supabase
const pool = new Pool({
  connectionString: process.env.https://blazercarft.github.io/Lady/,
  ssl: {
    rejectUnauthorized: false // Obrigatório para o Supabase funcionar no Render
  }
});

// Middleware para entender JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir os arquivos da sua loja (HTML, CSS, JS do site) que estão na pasta principal
app.use(express.static(path.join(__dirname)));

// Rota principal para carregar a página inicial da loja
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Teste de conexão com o Banco de Dados ao iniciar o servidor
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erro ao conectar ao Supabase:', err.stack);
  }
  console.log('Conexão com o Supabase estabelecida com sucesso!');
  release();
});

// Inicia o servidor na porta correta
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
