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

const CREATE_RESPONSE = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 1,
  info: '',
  serverStatus: 2,
  warningStatus: 0
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
    sinon.stub(productModel, 'getById').resolves(GET_BY_ID_RESPONSE);
  });

  after(() => {
    productModel.getById.restore();
  });

  it('Returns an object', async () => {
    const product = await productService.getById();
    expect(product).to.be.an('object');
  });
});

describe('When calling create service', () => {
  before(() => {
    sinon.stub(productModel, 'create').resolves(CREATE_RESPONSE);
  });

  after(() => {
    productModel.create.restore();
  });

  it('Returns an object with insert data', async () => {
    const result = await productService.create();
    expect(result).to.be.an('object');
    expect(result).not.to.be.empty;
  });
});

describe('When calling update service', () => {
  before(() => {
    sinon.stub(productModel, 'update').resolves();
  });

  after(() => {
    productModel.update.restore();
  });

  it('productModel.update must be called', async () => {
    await productService.update();
    expect(productModel.update.called).to.be.equal(true);
  });
});

describe('When calling remove service', () => {
  before(() => {
    sinon.stub(productModel, 'remove').resolves();
  });

  after(() => {
    productModel.remove.restore();
  });

  it('productModel.remove must be called', async () => {
    await productService.remove();
    expect(productModel.remove.called).to.be.equal(true);
  });
});

describe('When calling subtractQuantity service', () => {
  before(() => {
    sinon.stub(productModel, 'subtractQuantity').resolves();
  });

  after(() => {
    productModel.subtractQuantity.restore();
  });

  it('productModel.subtractQuantity must be called', async () => {
    await productService.subtractQuantity();
    expect(productModel.subtractQuantity.called).to.be.equal(true);
  });
});

describe('When calling addQuantity service', () => {
  before(() => {
    sinon.stub(productModel, 'addQuantity').resolves();
  });

  after(() => {
    productModel.addQuantity.restore();
  });

  it('productModel.addQuantity must be called', async () => {
    await productService.addQuantity();
    expect(productModel.addQuantity.called).to.be.equal(true);
  });
});