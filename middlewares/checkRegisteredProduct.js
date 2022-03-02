const validationService = require('../services/validationService');

const checkRegisteredProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    const registeredError = await validationService.checkRegisteredProduct(name);
    if (registeredError) {
      return res.status(registeredError.code).json({ message: registeredError.message });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkRegisteredProduct;