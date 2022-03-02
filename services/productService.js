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

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
