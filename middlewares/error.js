const error = (err, _req, res, _next) => {
  return res.status(500).json({ message: err.message });
};

module.exports = error;