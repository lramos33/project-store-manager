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

const getByName = async (name) => {
  const [result] = await connection.execute(`
    SELECT * FROM StoreManager.products
    WHERE name = ?
  `,
  [name]);
  return result;
};

const remove = async (id) => {
  const [result] = await connection.execute(`
    DELETE FROM StoreManager.products
    WHERE id = ?`,
  [id]);
  return result.affectedRows;
};

// <-- IN PROGRESS -->
const create = async (name, quantity) => {
  const [result] = await connection.execute(`
    INSERT INTO StoreManager.products
    (name, quantity) VALUES (?, ?)`,
    [name, quantity]);
  return { id: result.insertId, name, quantity };
};

// <-- TO DO -->
// const update = () => {};

module.exports = {
  get,
  getById,
  getByName,
  create,
  // update,
  remove,
};
