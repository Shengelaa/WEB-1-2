const express = require("express");
const { readFile, writeFile } = require("../Lec12/utils");
const app = express();

app.use(express.json());

app.get("/api/posts", async (req, res) => {
  const posts = await readFile("posts.json", true);
  res.json(posts);
});

app.post("/api/posts");

app.delete("/api/posts/:id")

app.put("/api/posts/:id");

// app.get("/", (req, res) => {
//   console.log(req.url, "request");
//   //! console.log(req.body, "request body");
//   // TODO  console.log(req.headers, "Request headers");
//   //  TODO console.log(req.query, "request query");
//   //  ! console.log(req.ip, "request ip");

//   //   console.log(req.query);

//   //   const query = req.query;

//   //   console.log(query);

//   const secret = req.headers["secret"];
//   if (secret === "12345") {
//     return res.send("this is secret info");
//   }

//   res.send("hello");
// });
// app.get("/posts", (req, res) => {
//   //   res.send({ name: "posts" });
//   res.status(200).json([{ name: "posts1" }]);
//   res.redirect("https://chess.com");
// });

// app.get("/:name", (req, res) => {
//   console.log(req.params, "req.params");
//   res.end("dynamic route");
// });

// app.get("/:name/:id", (req, res) => {
//   console.log(req.params, "req.params");
//   res.end("dynamic route");
// });

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
