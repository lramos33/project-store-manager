const sinon = require("sinon");
const { expect } = require("chai");

const connection = require('../../models/connection');
const salesModel = require('../../models/salesModel');

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

describe('When calling get model', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([GET_RESPONSE, []]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Returns an array of objects', async () => {
    const sales = await salesModel.get();
    expect(sales).to.be.an('array');
    expect(sales).not.to.be.empty;
    sales.forEach((sale) => expect(sale).to.be.an('object'));
  });
});

describe('When calling getById model', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([[GET_BY_ID_RESPONSE], []]);
  });

  after(() => {
    connection.execute.restore();
  })

  it('Returns an array', async () => {
    const sale = await salesModel.getById();
    expect(sale).to.be.an('array');
  });
});

describe('When calling createNewSale model', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([CREATE_NEW_SALE_RESPONSE]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Returns an object with insert data', async () => {
    const result = await salesModel.createNewSale();
    expect(result).to.be.an('object');
    expect(result).not.to.be.empty;
  });
});

describe('When calling insertIntoNewSale model', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves()
  });

  after(() => {
    connection.execute.restore();
  })

  it('connection.execute must be called', async () => {
    await salesModel.insertIntoNewSale();
    expect(connection.execute.called).to.be.equal(true);
  });
});

describe('When calling update model', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves()
  });

  after(() => {
    connection.execute.restore();
  })

  it('connection.execute must be called', async () => {
    await salesModel.update();
    expect(connection.execute.called).to.be.equal(true);
  });
});

describe('When calling remove model', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves()
  });

  after(() => {
    connection.execute.restore();
  })

  it('connection.execute must be called', async () => {
    await salesModel.remove();
    expect(connection.execute.called).to.be.equal(true);
  });
});