const productModel = require('../models/productModel');

// <-- TESTED -->

// <-- DONE -->
const get = async () => productModel.get();

const getById = async (id) => productModel.getById(id); 

const remove = async (id) => productModel.remove(id);

// <-- IN PROGRESS -->

// <-- TO DO -->
// const create = () => {};
// const update = () => {};

module.exports = {
  get,
  getById,
  // create,
  // update,
  remove,
};
