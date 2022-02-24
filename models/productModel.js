const connection = require('./connection');

// <-- TESTED -->

// <-- DONE -->
const get = async () => {
  const [result] = await connection.execute(`
    SELECT * FROM StoreManager.products 
    ORDER BY id ASC`);
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(`
    SELECT * FROM StoreManager.products
    WHERE id = ?`,
    [id]);
  return result[0];
};

// <-- IN PROGRESS -->

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
