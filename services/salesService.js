const salesModel = require('../models/salesModel');

// <-- TESTED -->

// <-- DONE -->
const get = async () => salesModel.get();

const getById = async (id) => salesModel.getById(id);

const create = async (sales) => {
  const saleId = await salesModel.createNewSale();
  sales.forEach(async (sale) => {
    await salesModel.insertIntoNewSale(saleId.insertId, sale.productId, sale.quantity);
  });
  return ({ id: saleId.insertId, itemsSold: sales });
};

const update = async (saleId, sale) => {
  sale.forEach(async (item) => {
    await salesModel.update(saleId, item.productId, item.quantity);
  });
  return ({ saleId, itemUpdated: sale });
};

// const remove = () => {};

module.exports = {
  get,
  getById,
  create,
  update,
  // remove,
};
