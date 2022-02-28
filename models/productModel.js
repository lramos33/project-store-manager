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
  return result[0]; // Index 0 to change result from [{...}] to {...}
};

const getByName = async (name) => {
  const [result] = await connection.execute(`
    SELECT * FROM StoreManager.products
    WHERE name = ?`,
    [name]);
  return result;
};

const create = async (name, quantity) => {
  const [result] = await connection.execute(`
    INSERT INTO StoreManager.products
    (name, quantity) VALUES (?, ?)`,
    [name, quantity]);
  return result;
};

const update = async (id, name, quantity) => {
  await connection.execute(`
    UPDATE StoreManager.products
    SET name = ?, quantity = ?
    WHERE id = ?`,
    [name, quantity, id]);
};

const remove = async (id) => {
  const [result] = await connection.execute(`
    DELETE FROM StoreManager.products
    WHERE id = ?`,
    [id]);
  return result;
};

module.exports = {
  get,
  getById,
  getByName,
  create,
  update,
  remove,
};
