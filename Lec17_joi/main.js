const express = require("express");
const userSchema = require("./validations/user.validation");
const validateMiddleware = require("./middlewares/validate.middleware");
const app = express();

app.use(express.json());

// const user = {
//   fullName: "required string length",
//   email: "required email",
//   age: "min 11 max 80 required number",
//   password: "min max regex",
//   isSmoker: "option default false",

// };

app.post("/", validateMiddleware(userSchema), (req, res) => {
  res.json(req.body);
});

app.listen(3000, () => {
  console.log("running on http://localhost:3000");
});
