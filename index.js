require('dotenv').config();
const express = require('express');

const error = require('./middlewares/error');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');
const productValidation = require('./middlewares/productValidationMiddleware');

const app = express();
app.use(express.json());

// <-- TESTED -->

// <-- DONE -->
app.get('/products', productController.get);
app.get('/products/:id', productController.getById);
app.delete('/products/:id', productController.remove);

app.get('/sales', salesController.get);
app.get('/sales/:id', salesController.getById);

// <-- IN PROGRESS -->
app.post('/products', productValidation, productController.create);

// <-- TO DO -->
// app.put('/products/:id', );

// app.post('/sales', );
// app.put('sales/:id', );
// app.delete('sales/:id',);

app.use(error);

// <-- ENDPOINT AVALIADOR -->
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
