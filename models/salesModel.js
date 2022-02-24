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

// <-- IN PROGRESS -->
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

// <-- TO DO -->
// const create = () => {};
// const update = () => {};
// const remove = () => {};

module.exports = {
  get,
  getById,
  // create,
  // update,
  // remove,
};
