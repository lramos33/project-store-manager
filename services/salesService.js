const salesModel = require('../models/salesModel');

// <-- TESTED -->

// <-- DONE -->
const get = async () => salesModel.get();

const getById = async (id) => salesModel.getById(id);

const create = async (sales) => {
  const saleId = await salesModel.createNewSale();

  sales.forEach(async (sale) => {
    await salesModel.insertIntoNewSale(saleId, sale.productId, sale.quantity);
  });

  return ({
    id: saleId,
    itemsSold: sales,
  });
};

// <-- TO DO -->
// const update = () => {};
// const remove = () => {};

module.exports = {
  get,
  getById,
  create,
  // update,
  // remove,
};
