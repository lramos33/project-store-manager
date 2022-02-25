const productModel = require('../models/productModel');

// <-- TESTED -->

// <-- DONE -->
const get = async () => productModel.get();

const getById = async (id) => productModel.getById(id); 

const remove = async (id) => productModel.remove(id);

const create = async (name, quantity) => productModel.create(name, quantity);

// <-- TO DO -->
const update = async (id, name, quantity) => productModel.update(id, name, quantity);

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
