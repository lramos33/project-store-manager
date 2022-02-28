const connection = require('./connection');

// <-- TESTED -->

// <-- DONE -->
const get = async () => {
  const [result] = await connection.execute(`
    SELECT 
      sp.sale_id AS saleId, 
      s.date, 
      sp.product_id AS productId, 
      sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    ORDER BY saleID ASC, productId ASC`);
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(`
    SELECT
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    WHERE sale_id = ?`,
    [id]);
  return result;
};

const createNewSale = async () => {
  const [newSale] = await connection.execute(`
  INSERT INTO StoreManager.sales
  () VALUES ()`);
  return newSale.insertId;
};

const insertIntoNewSale = async (saleId, productId, productQuantity) => {
  await connection.execute(`
    INSERT INTO StoreManager.sales_products
    (sale_id, product_id, quantity) VALUES (?, ?, ?)`,
    [saleId, productId, productQuantity]);
};

// <-- TO DO -->
// const update = () => {};
// const remove = () => {};

module.exports = {
  get,
  getById,
  createNewSale,
  insertIntoNewSale,
  // update,
  // remove,
};
