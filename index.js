require('dotenv').config();
const express = require('express');

const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');
const error = require('./middlewares/error');
const bodyProductValidation = require('./middlewares/bodyProductValidation');
const checkRegisteredProduct = require('./middlewares/checkRegisteredProduct');
const checkIfProductExists = require('./middlewares/checkIfProductExists');
const bodySalesValidation = require('./middlewares/bodySalesValidation');
const checkIfSaleExists = require('./middlewares/checkIfSaleExists');
const updateQuantity = require('./middlewares/updateQuantity');
const quantityValidation = require('./middlewares/quantityValidation');

const app = express();
app.use(express.json());

app.get('/products', productController.get);
app.get('/products/:id', checkIfProductExists, productController.getById);
app.delete('/products/:id', checkIfProductExists, productController.remove);
app.post('/products', bodyProductValidation, checkRegisteredProduct, productController.create);
app.put('/products/:id', bodyProductValidation, checkIfProductExists, productController.update);

app.get('/sales', salesController.get);
app.get('/sales/:id', salesController.getById);
app.delete('/sales/:id', checkIfSaleExists, updateQuantity.deleteSale, salesController.remove);
app.post('/sales', 
  bodySalesValidation,
  quantityValidation,
  updateQuantity.createSale,
  salesController.create);
app.put('/sales/:id', bodySalesValidation, salesController.update);

app.use(error);

// <-- ENDPOINT AVALIADOR -->
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
