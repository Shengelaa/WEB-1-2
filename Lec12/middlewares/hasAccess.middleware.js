const isAdmin = (req, res, next) => {
  const role = req.headers["role"];

  if (role !== "admin") {
    return res.status(404).json({ error: "permittion denied" });
  }
  next();
};

const isEditor = (req, res, next) => {
  const role = req.headers["role"];

  if (role !== "editor" && role !== "admin") {
    return res.status(404).json({ error: "permittion denied" });
  }
  next();
};

const isViewer = (req, res, next) => {
  const role = req.headers["role"];

  if (role !== "viewer" && role !== "editor" && role !== "admin") {
    return res.status(404).json({ error: "permittion denied" });
  }
  next();
};

module.exports = { isAdmin, isEditor, isViewer };
