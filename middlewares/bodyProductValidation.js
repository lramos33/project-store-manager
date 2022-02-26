const validationService = require('../services/validationService');

// <-- TESTED -->

// <-- DONE -->
const bodyProductValidation = (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const nameError = validationService.validateProductName(name);
    const quantityError = validationService.validateProductQuantity(quantity);
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

module.exports = bodyProductValidation;