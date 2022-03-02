const validationService = require('../services/validationService');

const checkIfProductExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productError = await validationService.checkIfProductExists(id);
    if (productError) {
      return res.status(productError.code).json({ message: productError.message });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkIfProductExists;