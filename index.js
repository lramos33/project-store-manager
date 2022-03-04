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

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
