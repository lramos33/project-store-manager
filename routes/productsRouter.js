const express = require('express');

const productController = require('../controllers/productController');
const bodyProductValidation = require('../middlewares/bodyProductValidation');
const checkRegisteredProduct = require('../middlewares/checkRegisteredProduct');
const checkIfProductExists = require('../middlewares/checkIfProductExists');

const productRouter = express.Router();

productRouter.get(
  '/',
  productController.get,
);

productRouter.get(
  '/:id',
  checkIfProductExists,
  productController.getById,
);

productRouter.delete(
  '/:id',
  checkIfProductExists,
  productController.remove,
);

productRouter.post(
  '/',
  bodyProductValidation,
  checkRegisteredProduct,
  productController.create,
);

productRouter.put(
  '/:id',
  bodyProductValidation,
  checkIfProductExists,
  productController.update,
);

module.exports = productRouter;