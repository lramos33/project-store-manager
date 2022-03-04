const sinon = require("sinon");
const { expect } = require("chai");

const salesService = require("../../../services/salesService");
const salesController = require("../../../controllers/salesController");

const CREATE_BODY_REQUEST = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 2
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

const UPDATE_RESPONSE = {
  "saleId": "1",
  "itemUpdated": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 3
    }
  ]
};

const CREATE_RESPONSE = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 2
    }
  ]
};

describe('When calling get controller', () => {
  const req = {}; 
  const res ={}; 
  let next = () => {};

  describe('In case of success', () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'get').resolves([]);
    });

    after(() => {
      salesService.get.restore();
    });

    it('Returns status 200', async () => {
      await salesController.get(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('Returns an array', async () => {
      await salesController.get(req, res, next);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('In case of error', () => {
    const err = Error('Error message');

    before(() => {
      next = sinon.stub().returns();
      sinon.stub(salesService, 'get').throws(err);
    });

    after(() => {
      salesService.get.restore();
    });

    it('The error is passed to the next error handler', async () => {
      await salesController.get(req, res, next);
      expect(next.calledWith(sinon.match(err))).to.be.equal(true);
    });
  });
});

describe('When calling getById controller', () => {
  const req = {}; 
  const res ={}; 
  let next = () => {};

  describe('In case of success', () => {
    before(() => {
      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getById').resolves([[]]);
    });

    after(() => {
      salesService.getById.restore();
    });

    it('Returns status 200', async () => {
      await salesController.getById(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('Returns an array', async () => {
      await salesController.getById(req, res, next);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('In case of error', () => {
    const err = Error('Error message');

    before(() => {
      next = sinon.stub().returns();
      sinon.stub(salesService, 'getById').throws(err);
    });

    after(() => {
      salesService.getById.restore();
    });

    it('The error is passed to the next error handler', async () => {
      await salesController.getById(req, res, next);
      expect(next.calledWith(sinon.match(err))).to.be.equal(true);
    });
  });
});

describe('When calling create controller', () => {
  const req = {}; 
  const res ={}; 
  let next = () => {};

  describe('In case of success', () => {
    before(() => {
      req.body = CREATE_BODY_REQUEST;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'create').resolves(CREATE_RESPONSE);
    });

    after(() => {
      salesService.create.restore();
    });

    it('Returns status 201', async () => {
      await salesController.create(req, res, next);
      expect(res.status.calledWith(201)).to.be.equal(true);
    });

    it('Returns the created object with id', async () => {
      await salesController.create(req, res, next);
      expect(res.json.calledWith(CREATE_RESPONSE)).to.be.equal(true);
    });
  });

  describe('In case of error', () => {
    const err = Error('Error message');

    before(() => {
      next = sinon.stub().returns();
      sinon.stub(salesService, 'create').throws(err);
    });

    after(() => {
      salesService.create.restore();
    });

    it('The error is passed to the next error handler', async () => {
      await salesController.create(req, res, next);
      expect(next.calledWith(sinon.match(err))).to.be.equal(true);
    });
  });
});

describe('When calling update controller', () => {
  const req = {}; 
  const res ={}; 
  let next = () => {};

  describe('In case of success', () => {
    before(() => {
      req.params = { id: 1 };
      req.body = UPDATE_BODY_REQUEST;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'update').returns(UPDATE_RESPONSE);
    });

    after(() => {
      salesService.update.restore();
    });

    it('salesService.update must be called', async () => {
      await salesController.update(req, res, next);
      expect(salesService.update.called).to.be.equal(true);
    });

    it('Returns status 200', async () => {
      await salesController.update(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('Returns the updated object', async () => {
      await salesController.update(req, res, next);
      expect(res.json.calledWith(UPDATE_RESPONSE)).to.be.equal(true);
    });
  });

  describe('In case of error', () => {
    const err = Error('Error message');

    before(() => {
      next = sinon.stub().returns();
      sinon.stub(salesService, 'update').throws(err);
    });

    after(() => {
      salesService.update.restore();
    });

    it('The error is passed to the next error handler', async () => {
      await salesController.update(req, res, next);
      expect(next.calledWith(sinon.match(err))).to.be.equal(true);
    });
  });
});

describe('When calling remove controller', () => {
  const req = {}; 
  const res ={}; 
  let next = () => {};

  describe('In case of success', () => {
    before(() => {
      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon.stub(salesService, 'remove').returns();
    });

    after(() => {
      salesService.remove.restore();
    });

    it('salesService.remove must be called', async () => {
      await salesController.remove(req, res, next);
      expect(salesService.remove.called).to.be.equal(true);
    });

    it('Returns status 204', async () => {
      await salesController.remove(req, res, next);
      expect(res.status.calledWith(204)).to.be.equal(true);
    });

    it('Returns nothing, ends the request', async () => {
      await salesController.remove(req, res, next);
      expect(res.end.called).to.be.equal(true);
    });

  });

  describe('In case of error', () => {
    const err = Error('Error message');

    before(() => {
      next = sinon.stub().returns();
      sinon.stub(salesService, 'remove').throws(err);
    });

    after(() => {
      salesService.remove.restore();
    });

    it('The error is passed to the next error handler', async () => {
      await salesController.remove(req, res, next);
      expect(next.calledWith(sinon.match(err))).to.be.equal(true);
    });
  });
});