const sinon = require("sinon");
const { expect } = require("chai");

const productService = require("../../../services/productService");
const productController = require("../../../controllers/productController");

describe('When calling get controller', () => {
  const req = {}; 
  const res ={}; 
  let next = () => {};
  
  describe('In case of success', () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'get').resolves([]);
    });

    after(() => {
      productService.get.restore();
    });
    
    it('Returns status 200', async () => {
      await productController.get(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('Returns an array', async () => {
      await productController.get(req, res, next);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('In case of error', () => {
    const err = Error('Error message');

    before(() => {
      next = sinon.stub().returns();
      sinon.stub(productService, 'get').throws(err);
    });

    after(() => {
      productService.get.restore();
    });

    it('The error is passed to the next error handler', async () => {
      await productController.get(req, res, next);
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
      req.params = { id: 1 }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'getById').resolves({});
    });

    after(() => {
      productService.getById.restore();
    });

    it('Returns status 200', async () => {
      await productController.getById(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('Returns an object', async () => {
      await productController.getById(req, res, next);
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

  });

  describe('In case of error', () => {
    const err = Error('Error message');

    before(() => {
      next = sinon.stub().returns();
      sinon.stub(productService, 'getById').throws(err);
    });

    after(() => {
      productService.getById.restore();
    });

    it('The error is passed to the next error handler', async () => {
      await productController.getById(req, res, next);
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
      req.body = { name: "Arco do Gavião Arqueiro", quantity: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'create').resolves({ id: 1, name: "Arco do Gavião Arqueiro", quantity: 1 });
    });

    after(() => {
      productService.create.restore();
    });

    it('Returns status 201', async () => {
      await productController.create(req, res, next);
      expect(res.status.calledWith(201)).to.be.equal(true);
    });

    it('Returns the created object with id', async () => {
      await productController.create(req, res, next);
      expect(res.json.calledWith({ id: 1, name: "Arco do Gavião Arqueiro", quantity: 1 })).to.be.equal(true);
    });
  });

  describe('In case of error', () => {
    const err = Error('Error message');

    before(() => {
      next = sinon.stub().returns();
      sinon.stub(productService, 'create').throws(err);
    });

    after(() => {
      productService.create.restore();
    });

    it('The error is passed to the next error handler', async () => {
      await productController.create(req, res, next);
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
      req.body = { name: "Machado do Thor", quantity: 20 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'update').returns();
    });

    after(() => {
      productService.update.restore();
    });

    it('productService.update must be called', async () => {
      await productController.update(req, res, next);
      expect(productService.update.called).to.be.equal(true);
    });

    it('Returns status 200', async () => {
      await productController.update(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('Returns the updated object', async () => {
      await productController.update(req, res, next);
      expect(res.json.calledWith({ id: 1, name: "Machado do Thor", quantity: 20 })).to.be.equal(true);
    });
  });

  describe('In case of error', () => {
    const err = Error('Error message');

    before(() => {
      next = sinon.stub().returns();
      sinon.stub(productService, 'update').throws(err);
    });

    after(() => {
      productService.update.restore();
    });

    it('The error is passed to the next error handler', async () => {
      await productController.update(req, res, next);
      expect(next.calledWith(sinon.match(err))).to.be.equal(true);
    });
  });
});

describe('When calling delete controller', () => {
  const req = {}; 
  const res ={}; 
  let next = () => {};

  describe('In case of success', () => {
    before(() => {
      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon.stub(productService, 'remove').returns();
    });

    after(() => {
      productService.remove.restore();
    });

    it('productService.remove must be called', async () => {
      await productController.remove(req, res, next);
      expect(productService.remove.called).to.be.equal(true);
    });

    it('Returns status 204', async () => {
      await productController.remove(req, res, next);
      expect(res.status.calledWith(204)).to.be.equal(true);
    });

    it('Returns nothing, ends the request', async () => {
      await productController.update(req, res, next);
      expect(res.end.called).to.be.equal(true);
    });

  });

  describe('In case of error', () => {
    const err = Error('Error message');

    before(() => {
      next = sinon.stub().returns();
      sinon.stub(productService, 'remove').throws(err);
    });

    after(() => {
      productService.remove.restore();
    });

    it('The error is passed to the next error handler', async () => {
      await productController.remove(req, res, next);
      expect(next.calledWith(sinon.match(err))).to.be.equal(true);
    });
  });
});