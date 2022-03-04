const validationService = require('../services/validationService');

const bodySalesValidation = (req, res, next) => {
  try {
    const productIdError = req.body
      .map((sale) => sale.productId)
      .map((id) => validationService.validateProductId(id))
      .find((error) => error);

    const quantityError = req.body
      .map((sale) => sale.quantity)
      .map((quantity) => validationService.validateProductQuantity(quantity))
      .find((error) => error);

    if (productIdError) {
      return res.status(productIdError.code).json({ message: productIdError.message });
    }
    if (quantityError) {
      return res.status(quantityError.code).json({ message: quantityError.message });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = bodySalesValidation;