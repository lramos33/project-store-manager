const sinon = require("sinon");
const { expect } = require("chai");

const connection = require('../../models/connection');
const productModel = require('../../models/productModel');

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

const GET_BY_NAME_RESPONSE = [ 
  {
    "id": 1,
    "name": 'Martelo do Thor',
    "quantity": 10,
  }
];

const CREATE_RESPONSE = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 1,
  info: '',
  serverStatus: 2,
  warningStatus: 0
}

describe('When calling get model', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([GET_RESPONSE, []]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Returns an array of objects', async () => {
    const products = await productModel.get();
    expect(products).to.be.an('array');
    expect(products).not.to.be.empty;
    products.forEach((product) => expect(product).to.be.an('object'));
  });
});

describe('When calling getById model', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([[GET_BY_ID_RESPONSE], []]);
  });

  after(() => {
    connection.execute.restore();
  })

  it('Returns an object', async () => {
    const product = await productModel.getById();
    expect(product).to.be.an('object');
  });
});

describe('When calling getByName model', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([GET_BY_NAME_RESPONSE, []]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Returns an array with one object', async () => {
    const product = await productModel.getByName();
    expect(product).to.be.an('array');
    expect(product).not.to.be.empty;
    expect(product.length).to.be.equal(1);
    expect(product[0]).to.be.an('object');
  });
});

describe('When calling create model', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([CREATE_RESPONSE]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Returns an object with insert data', async () => {
    const result = await productModel.create();
    expect(result).to.be.an('object');
    expect(result).not.to.be.empty;
  });
});

describe('When calling update model', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves();
  });

  after(() => {
    connection.execute.restore();
  })

  it('connection.execute must be called', async () => {
    await productModel.update();
    expect(connection.execute.called).to.be.equal(true);
  });
});

describe('When calling remove model', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves();
  });

  after(() => {
    connection.execute.restore();
  })

  it('connection.execute must be called', async () => {
    await productModel.remove();
    expect(connection.execute.called).to.be.equal(true);
  });
});

describe('When calling subtractQuantity model', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves();
  });

  after(() => {
    connection.execute.restore();
  });

  it('connection.execute must be called', async () => {
    await productModel.subtractQuantity();
    expect(connection.execute.called).to.be.equal(true);
  });
});

describe('When calling addQuantity model', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves();
  });

  after(() => {
    connection.execute.restore();
  });

  it('connection.execute must be called', async () => {
    await productModel.addQuantity();
    expect(connection.execute.called).to.be.equal(true);
  });
});