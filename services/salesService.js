const salesModel = require('../models/salesModel');

// <-- TESTED -->

// <-- DONE -->
const get = async () => salesModel.get();

const getById = async (id) => salesModel.getById(id);

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
