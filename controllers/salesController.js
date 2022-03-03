const salesService = require('../services/salesService');

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;
const HTTP_NOT_FOUND = 404;

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

const create = async (req, res, next) => {
  try {
    const result = await salesService.create(req.body);
    return res.status(HTTP_CREATED).json(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await salesService.update(id, req.body);
    return res.status(HTTP_OK).json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await salesService.remove(+id);
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
