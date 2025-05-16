const { Router } = require("express");

const studentRouter = Router();

const students = [
  {
    id: 1,
    name: "gela",
    age: 21,
  },
];

studentRouter.get("/", (req, res) => {
  res.json(students);
});

module.exports = studentRouter;
