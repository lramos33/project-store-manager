const productModel = require('../models/productModel');

// <-- TESTED -->

// <-- DONE -->
const get = async () => productModel.get();

const getById = async (id) => productModel.getById(id); 

// <-- IN PROGRESS -->

// <-- TO DO -->
// const create = () => {};
// const update = () => {};
// const remove = () => {};

module.exports = {
  get,
  getById,
  // create,
  // update,
  // remove,
};
