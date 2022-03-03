const productService = require('../services/productService');
const salesService = require('../services/salesService'); 

const createSale = (req, res, next) => {
  try {
    const sale = req.body;
    sale.forEach(async ({ productId, quantity }) => {
      await productService.subtractQuantity(productId, quantity);
    });
    next();
  } catch (error) {
    next(error);
  }
};

const deleteSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);

    sale.forEach(async ({ productId, quantity }) => {
      await productService.addQuantity(productId, quantity);
    });

    console.log(sale);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSale,
  deleteSale,
};