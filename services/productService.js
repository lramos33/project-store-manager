const productModel = require('../models/productModel');

const get = async () => productModel.get();

const getById = async (id) => productModel.getById(id); 

const create = async (name, quantity) => {
  const createdProduct = await productModel.create(name, quantity);
  return { id: createdProduct.insertId, name, quantity };
};

const update = async (id, name, quantity) => {
  await productModel.update(id, name, quantity);
};

const remove = async (id) => {
  await productModel.remove(id);
};

const subtractQuantity = async (id, quantity) => {
  await productModel.subtractQuantity(id, quantity);
};

const addQuantity = async (id, quantity) => {
  await productModel.addQuantity(id, quantity);
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
  subtractQuantity,
  addQuantity,
};
