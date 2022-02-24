const productModel = require('../models/productModel');

// <-- TESTED -->

// <-- DONE -->
const get = async () => productModel.get();

const getById = async (id) => productModel.getById(id); 

const remove = async (id) => productModel.remove(id);

const create = async (name, quantity) => productModel.create(name, quantity);

// <-- IN PROGRESS -->

// <-- TO DO -->
// const update = () => {};

module.exports = {
  get,
  getById,
  create,
  // update,
  remove,
};
