require('dotenv').config();
const express = require('express');

const error = require('./middlewares/error');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(express.json());

// <-- TESTED -->

// <-- DONE -->

// <-- IN PROGRESS -->

// <-- TO DO -->
app.get('/products', );
app.get('/products/:id', );
app.post('/products', );
app.put('/product/:id', );
app.delete('/product/:id', );

app.get('/sales', );
app.get('/sales/:id', );
app.post('/sales', );
app.put('sales/:id', );
app.delete('sales/:id',);

app.use(error);

// <-- ENDPOINT AVALIADOR -->
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
