module.exports = (err, req, res, next) => {
  res.status(500).json({ msg: "Internal server error", error: err.message });
};
