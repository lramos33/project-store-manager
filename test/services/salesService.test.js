const sinon = require("sinon");
const { expect } = require("chai");

const salesModel = require('../../models/salesModel');
const salesService = require('../../services/salesService');

const GET_RESPONSE = [
  {
    "saleId": 1,
    "date": "2022-03-04T03:48:21.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-03-04T03:48:21.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-03-04T03:48:21.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const GET_BY_ID_RESPONSE = [
  {
    "date": "2022-03-04T03:48:21.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2022-03-04T03:48:21.000Z",
    "productId": 2,
    "quantity": 10
  }
];

const CREATE_NEW_SALE_RESPONSE = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 3,
  info: '',
  serverStatus: 2,
  warningStatus: 0
};

const CREATE_BODY_REQUEST = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 20
  }
];

const UPDATE_BODY_REQUEST = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 3
  }
];

describe('When calling get service', () => {
  before(() => {
    sinon.stub(salesModel, 'get').resolves(GET_RESPONSE);
  });

  after(() => {
    salesModel.get.restore();
  });

  it('Returns an array of objects', async () => {
    const sales = await salesService.get();
    expect(sales).to.be.an('array');
    expect(sales).not.to.be.empty;
    sales.forEach((sale) => expect(sale).to.be.an('object'));
  });
});

describe('When calling getById service', () => {
  before(() => {
    sinon.stub(salesModel, 'getById').resolves(GET_BY_ID_RESPONSE);
  });

  after(() => {
    salesModel.getById.restore();
  });

  it('Returns an array of objects', async () => {
    const sale = await salesService.getById();
    expect(sale).to.be.an('array');
    expect(sale).not.to.be.empty;
    sale.forEach((data) => expect(data).to.be.an('object'));
  });
});

describe('When calling create service', () => {
  before(() => {
    sinon.stub(salesModel, 'createNewSale').resolves(CREATE_NEW_SALE_RESPONSE);
    sinon.stub(salesModel, 'insertIntoNewSale').resolves();
  });

  after(() => {
    salesModel.createNewSale.restore();
    salesModel.insertIntoNewSale.restore();
  });

  it('salesModel.createNewSale must be called', async () => {
    await salesService.create(CREATE_BODY_REQUEST);
    expect(salesModel.createNewSale.called).to.be.equal(true);
  });

  it('salesModel.insertIntoNewSale must be called', async () => {
    await salesService.create(CREATE_BODY_REQUEST);
    expect(salesModel.insertIntoNewSale.called).to.be.equal(true);
  });
});

describe('When calling update service', () => {
  before(() => {
    sinon.stub(salesModel, 'update').resolves();
  });

  after(() => {
    salesModel.update.restore();
  });

  it('salesModel.update must be called', async () => {
    await salesService.update(1, UPDATE_BODY_REQUEST);
    expect(salesModel.update.called).to.be.equal(true);
  });
});

describe('When calling remove service', () => {
  before(() => {
    sinon.stub(salesModel, 'remove').resolves();
  });

  after(() => {
    salesModel.remove.restore();
  });

  it('salesModel.remove must be called', async () => {
    await salesService.remove();
    expect(salesModel.remove.called).to.be.equal(true);
  });
});