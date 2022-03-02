const productModel = require('../models/productModel');

const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const HTTP_UNPROCESSABLE_ENTITY = 422;
const HTTP_CONFLICT = 409;

const validateProductName = (name) => {
  if (!name) {
    return { 
      code: HTTP_BAD_REQUEST,
      message: '"name" is required' };
  }

  if (name.length < 5) {
    return { 
      code: HTTP_UNPROCESSABLE_ENTITY,
      message: '"name" length must be at least 5 characters long' };
  }
};

const validateProductQuantity = (quantity) => {
  if (quantity === undefined) {
    return { 
      code: HTTP_BAD_REQUEST,
      message: '"quantity" is required' };
  }

  if (quantity <= 0) {
    return {
      code: HTTP_UNPROCESSABLE_ENTITY,
      message: '"quantity" must be greater than or equal to 1' };
  }
};

const checkRegisteredProduct = async (name) => {
  const registeredProduct = await productModel.getByName(name);
  if (registeredProduct.length !== 0) {
    return {
      code: HTTP_CONFLICT,
      message: 'Product already exists' };
  }
};

const checkIfProductExists = async (id) => {
  const product = await productModel.getById(id);
  if (!product) {
    return {
      code: HTTP_NOT_FOUND,
      message: 'Product not found' };
  }
};

const validateProductId = (id) => {
  if (!id) {
    return {
      code: HTTP_BAD_REQUEST,
      message: '"productId" is required' };
  }
};

module.exports = {
  validateProductName,
  validateProductQuantity,
  checkRegisteredProduct,
  checkIfProductExists,
  validateProductId,
};
