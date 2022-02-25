const salesService = require('../services/salesService');

const HTTP_OK = 200;
const HTTP_NOT_FOUND = 404;

// <-- TESTED -->

// <-- DONE -->
const get = async (_req, res, next) => {
  try {
    const result = await salesService.get();
    return res.status(HTTP_OK).json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await salesService.getById(+id);
    if (result.length === 0) return res.status(HTTP_NOT_FOUND).json({ message: 'Sale not found' });
    return res.status(HTTP_OK).json(result);
  } catch (error) {
    next(error);
  }
};

// <-- TO DO -->
// const create = (req, res, next) => {};
// const update = (req, res, next) => {};
// const remove = (req, res, next) => {};

module.exports = {
  get,
  getById,
  // create,
  // update,
  // remove,
};
