const connection = require('./connection');

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
  const [result] = await connection.execute(`
  INSERT INTO StoreManager.sales
  () VALUES ()`);
  return result;
};

const insertIntoNewSale = async (saleId, productId, productQuantity) => {
  await connection.execute(`
    INSERT INTO StoreManager.sales_products
    (sale_id, product_id, quantity) VALUES (?, ?, ?)`,
    [saleId, productId, productQuantity]);
};

const update = async (saleId, productId, productQuantity) => {
  await connection.execute(`
    UPDATE StoreManager.sales_products
    SET quantity = ?
    WHERE sale_id = ? AND product_id = ?`,
    [productQuantity, saleId, productId]);
};

const remove = async (id) => {
  await connection.execute(`
    DELETE FROM StoreManager.sales
    WHERE id = ?`,
    [id]);
};

module.exports = {
  get,
  getById,
  createNewSale,
  insertIntoNewSale,
  update,
  remove,
};
