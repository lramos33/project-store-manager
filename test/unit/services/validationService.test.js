const sinon = require("sinon");
const { expect } = require("chai");

const productModel = require('../../../models/productModel');
const salesModel = require('../../../models/salesModel');
const validationService = require('../../../services/validationService');

const GET_BY_NAME_RESPONSE = [ 
  {
    "id": 1,
    "name": 'Martelo do Thor',
    "quantity": 10,
  }
];

describe('When calling validateProductName service', () => {
  describe('In case of name === undefined', () => {
    const MESSAGE = '"name" is required';
    const result = validationService.validateProductName(undefined);

    it('Returns an object with code and message keys', () => {
      expect(result).to.be.an('object');
      expect(result).not.to.be.empty;
      expect(result).to.include.all.keys('code', 'message');
    });

    it('Code value must be 400', () => {
      expect(result.code).to.be.equal(400);
    });

    it('Message value must be ""name" is required"', () => {
      expect(result.message).to.be.a('string');
      expect(result.message).to.be.equal(MESSAGE);
    });
  });

  describe('In case name.length < 5', () => {
    const MESSAGE = '"name" length must be at least 5 characters long';
    const result = validationService.validateProductName('ovo');

    it('Returns an object with code and message keys', () => {
      expect(result).to.be.an('object');
      expect(result).not.to.be.empty;
      expect(result).to.include.all.keys('code', 'message');
    });

    it('Code value must be 422', () => {
      expect(result.code).to.be.equal(422);
    });

    it('Message value must be ""name" length must be at least 5 characters long"', () => {
      expect(result.message).to.be.a('string');
      expect(result.message).to.be.equal(MESSAGE);
    });
  });
});

describe('When calling validateProductQuantity service', () => {
  describe('In case quantity === undefined', () => {
    const MESSAGE = '"quantity" is required';
    const result = validationService.validateProductQuantity(undefined);

    it('Returns an object with code and message keys', () => {
      expect(result).to.be.an('object');
      expect(result).not.to.be.empty;
      expect(result).to.include.all.keys('code', 'message');
    });

    it('Code value must be 400', () => {
      expect(result.code).to.be.equal(400);
    });

    it('Message value must be ""quantity" is required"', () => {
      expect(result.message).to.be.a('string');
      expect(result.message).to.be.equal(MESSAGE);
    });
  });

  describe('In case quantity <= 0', () => {
    const MESSAGE = '"quantity" must be greater than or equal to 1';
    const result = validationService.validateProductQuantity(0);

    it('Returns an object with code and message keys', () => {
      expect(result).to.be.an('object');
      expect(result).not.to.be.empty;
      expect(result).to.include.all.keys('code', 'message');
    });

    it('Code value must be 422', () => {
      expect(result.code).to.be.equal(422);
    });

    it('Message value must be ""quantity" must be greater than or equal to 1"', () => {
      expect(result.message).to.be.a('string');
      expect(result.message).to.be.equal(MESSAGE);
    });
  });
});

describe('When calling checkRegisteredProduct service', () => {
  describe('When product already exists', () => {
    const MESSAGE = 'Product already exists';

    before(() => {
      sinon.stub(productModel, 'getByName').resolves(GET_BY_NAME_RESPONSE);
    });
  
    after(() => {
      productModel.getByName.restore();
    });

    it('Returns an object with code and message keys', async () => {
      const result = await validationService.checkRegisteredProduct();
      expect(result).to.be.an('object');
      expect(result).not.to.be.empty;
      expect(result).to.include.all.keys('code', 'message');
    });

    it('Code value must be 409', async () => {
      const result = await validationService.checkRegisteredProduct();
      expect(result.code).to.be.equal(409);
    });

    it('Message value must be "Product already exists"', async () => {
      const result = await validationService.checkRegisteredProduct();
      expect(result.message).to.be.a('string');
      expect(result.message).to.be.equal(MESSAGE);
    });
  });
});

describe('When calling checkIfProductExists service', () => {
  describe('When product is not found', () => {
    const MESSAGE = 'Product not found';

    before(() => {
      sinon.stub(productModel, 'getById').resolves();
    });

    after(() => {
      productModel.getById.restore();
    });

    it('Returns an object with code and message keys', async () => {
      const result = await validationService.checkIfProductExists();
      expect(result).to.be.an('object');
      expect(result).not.to.be.empty;
      expect(result).to.include.all.keys('code', 'message');
    });

    it('Code value must be 404', async () => {
      const result = await validationService.checkIfProductExists();
      expect(result.code).to.be.equal(404);
    });

    it('Message value must be "Product not found"', async () => {
      const result = await validationService.checkIfProductExists();
      expect(result.message).to.be.a('string');
      expect(result.message).to.be.equal(MESSAGE);
    });
  });
});

describe('When calling validateProductId service', () => {
  describe('In case of id === undefined', () => {
    const MESSAGE = '"productId" is required';
    const result = validationService.validateProductId(undefined);

    it('Returns an object with code and message keys', () => {
      expect(result).to.be.an('object');
      expect(result).not.to.be.empty;
      expect(result).to.include.all.keys('code', 'message');
    });

    it('Code value must be 400', () => {
      expect(result.code).to.be.equal(400);
    });

    it('Message value must be ""productId" is required"', () => {
      expect(result.message).to.be.a('string');
      expect(result.message).to.be.equal(MESSAGE);
    });
  });
});

describe('When calling checkIfSaleExists service', () => {
  describe('When sale not found', () => {
    const MESSAGE = 'Sale not found';

    before(() => {
      sinon.stub(salesModel, 'getById').resolves([]);
    });

    after(() => {
      salesModel.getById.restore();
    })

    it('Returns an object with code and message keys', async () => {
      const result = await validationService.checkIfSaleExists();
      expect(result).to.be.an('object');
      expect(result).not.to.be.empty;
      expect(result).to.include.all.keys('code', 'message');
    });

    it('Code value must be 404', async () => {
      const result = await validationService.checkIfSaleExists();
      expect(result.code).to.be.equal(404);
    });

    it('Message value must be "Sale not found"', async () => {
      const result = await validationService.checkIfSaleExists();
      expect(result.message).to.be.a('string');
      expect(result.message).to.be.equal(MESSAGE);
    });
  });
});

describe('When calling quantityValidation service', () => {
  describe('In case of saleQuantity > availableQuantity', () => {
    const MESSAGE = 'Such amount is not permitted to sell';
    const result = validationService.quantityValidation(10, 5);

    it('Returns an object with code and message keys', () => {
      expect(result).to.be.an('object');
      expect(result).not.to.be.empty;
      expect(result).to.include.all.keys('code', 'message');
    });

    it('Code value must be 422', () => {
      expect(result.code).to.be.equal(422);
    });

    it('Message value must be "Such amount is not permitted to sell"', () => {
      expect(result.message).to.be.a('string');
      expect(result.message).to.be.equal(MESSAGE);
    });
  });
});