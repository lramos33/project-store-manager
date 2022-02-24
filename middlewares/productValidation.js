const productValidationService = require('../services/productValidationService');

// <-- TESTED -->

// <-- DONE -->

// <-- IN PROGRESS -->
const productValidation = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const nameError = await productValidationService.validateProductName(name);
    const quantityError = productValidationService.validateProductQuantity(quantity);
    if (nameError) {
      return res.status(nameError.code).json({ message: nameError.message });
    }
    if (quantityError) {
      return res.status(quantityError.code).json({ message: quantityError.message });
    }
    next();
  } catch (error) {
    next(error);
  }
};

// <-- TO DO -->

module.exports = productValidation;