const validationService = require('../services/validationService');

const checkIfSaleExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const saleError = await validationService.checkIfSaleExists(id);
    if (saleError) {
      return res.status(saleError.code).json({ message: saleError.message });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkIfSaleExists;