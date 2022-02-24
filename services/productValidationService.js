const productModel = require('../models/productModel');

const HTTP_CONFLICT = 409;

// <-- TESTED -->

// <-- DONE -->
const validateProductName = async (name) => {
  const registeredProduct = await productModel.getByName(name);
  switch (true) {
    case registeredProduct.length !== 0: 
      return { code: HTTP_CONFLICT, message: 'Product already exists' };
    case !name: 
      return { code: HTTP_CONFLICT, message: 'Name required' };
    case typeof name !== 'string': 
      return { code: HTTP_CONFLICT, message: 'Name must be a string' };
    case name.length < 5: 
      return { code: HTTP_CONFLICT, message: 'Name must have at least 5 characters' };
    default: 
      return undefined;
  }
};

const validateProductQuantity = (quantity) => {
  switch (true) {
    case !quantity: 
      return { code: HTTP_CONFLICT, message: 'Quantity required' };
    case typeof quantity !== 'number': 
      return { code: HTTP_CONFLICT, message: 'Quantity must be a number' };
    default: 
      return undefined;
  }
};

// <-- IN PROGRESS -->

// <-- TO DO -->

module.exports = {
  validateProductName,
  validateProductQuantity,
};
