const express = require("express");
const { readFile, writeFile } = require("./utils");
const apiRouter = require("./api");
const randomRouter = require("./random/random.route");

const app = express();

app.use(express.json());

//!  global middleware
// app.use((req, res, next) => {
//   console.log(req.headers["user-agent"]);
//   const key = req.headers["key"];

//   // if (key !== "123") {
//   //   return res.status(400).json({ message: "bad request" });
//   // }

//   next();
// });

app.use((req, res, next) => {
  const role = req.headers["role"];
  if (!role) {
    return res.status(400).json({ message: "role is required" });
  }

  next();
});

app.use("/api", apiRouter);

app.use("/random-info", randomRouter);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
