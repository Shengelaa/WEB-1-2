module.exports = (req, res, next) => {
  const role = req.headers["role"];
  if (!role) {
    return res.status(400).json({ message: "role is required" });
  }

  next();
};


