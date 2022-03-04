const express = require('express');

const salesController = require('../controllers/salesController');
const updateQuantity = require('../middlewares/updateQuantity');
const bodySalesValidation = require('../middlewares/bodySalesValidation');
const checkIfSaleExists = require('../middlewares/checkIfSaleExists');
const quantityValidation = require('../middlewares/quantityValidation');

const salesRouter = express.Router();

salesRouter.get(
  '/',
  salesController.get,
);

salesRouter.get(
  '/:id',
  salesController.getById,
);

salesRouter.delete(
  '/:id',
  checkIfSaleExists,
  updateQuantity.deleteSale,
  salesController.remove,
);

salesRouter.post(
  '/',
  bodySalesValidation,
  quantityValidation,
  updateQuantity.createSale,
  salesController.create,
);

salesRouter.put(
  '/:id',
  bodySalesValidation,
  salesController.update,
);

module.exports = salesRouter;