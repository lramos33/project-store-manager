require('dotenv').config();

const express = require('express');

const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');
const error = require('./middlewares/error');

const app = express();

app.use(express.json());
app.use('/products', productsRouter);
app.use('/sales', salesRouter);
app.use(error);

// <-- ENDPOINT AVALIADOR -->
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
