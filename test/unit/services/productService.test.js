const sinon = require("sinon");
const { expect } = require("chai");

const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');

const GET_RESPONSE = [
  {
    "id": 1,
    "name": "Martelo de Thor",
    "quantity": 10,
  },
  {
    "id": 2,
    "name": "Traje de encolhimento",
    "quantity": 20,
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América",
    "quantity": 30,
  }
];

const GET_BY_ID_RESPONSE = {
  "id": 1,
  "name": "Martelo de Thor",
  "quantity": 10,
};

describe('When calling get service', () => {

  before(() => {
    sinon.stub(productModel, 'get').resolves(GET_RESPONSE);
  });

  after(() => {
    productModel.get.restore();
  })

  it('Returns an array of objects', async () => {
    const products = await productService.get();

    expect(products).to.be.an('array');
    expect(products).not.to.be.empty;
    products.forEach((product) => expect(product).to.be.an('object'));
  });
});

describe('When calling getById service', () => {

  before(() => {
    sinon.stub(productModel, 'getById').resolves(GET_BY_ID_RESPONSE)
  });

  after(() => {
    productModel.getById.restore();
  })

  it('Returns an object', async () => {
    const product = await productService.getById();
    expect(product).to.be.an('object');
  });
});