const productService = require('../services/productService');

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;
const HTTP_NOT_FOUND = 404;

// <-- TESTED -->

// <-- DONE -->
const get = async (_req, res, next) => {
  try {
    const result = await productService.get();
    return res.status(HTTP_OK).json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productService.getById(+id);
    if (!result) {
      return res.status(HTTP_NOT_FOUND).json({ message: 'Product not found' });
    }
    return res.status(HTTP_OK).json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const createdProduct = await productService.create(name, quantity);
    return res.status(HTTP_CREATED).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    await productService.update(+id, name, quantity);
    return res.status(HTTP_OK).json({ id, name, quantity });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const affectedRows = await productService.remove(+id);
    if (!affectedRows) {
      return res.status(HTTP_NOT_FOUND).json({ message: 'Product not found' });
    }
    return res.status(HTTP_NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
