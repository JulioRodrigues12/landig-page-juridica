const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/res_form', (req, res) => {
  const { nome, email, mensagem } = req.body;

  const sql = `
    INSERT INTO res_form (nome, email, mensagem)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [nome, email, mensagem], (err, result) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao salvar mensagem' });
    }
    res.json({ mensagem: 'Mensagem enviada com sucesso!' });
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
