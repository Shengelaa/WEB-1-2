const express = require("express");
const { readFile, writeFile } = require("./utils");
const app = express();

app.use(express.json());

app.get("/api/posts", async (req, res) => {
  const posts = await readFile("posts.json", true);
  res.json(posts);
});

app.post("/api/posts", async (req, res) => {
  const email = req.headers["email"];
  if (!email) {
    return res.status(401).json({ message: "Email is needed" });
  }
  console.log(req.body.content);
  if (!req.body?.content) {
    return res.status(400).json({ message: "Content is required" });
  }
  const posts = await readFile("posts.json", true);

  const lastId = posts[posts.length - 1]?.id || 0;
  const newPost = {
    id: lastId + 1,
    content: req.body.content,
    email,
    createdAt: new Date().toISOString(),
  };

  posts.push(newPost);

  await writeFile("posts.json", JSON.stringify(posts));
  res.status(201).json({ message: "post created successfully", data: newPost });
});

app.get("/api/posts/:id", async (req, res) => {
  const id = Number(req.params.id);
  const posts = await readFile("posts.json", true);

  const index = posts.findIndex((el) => el.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "post not found" });
  }

  res.json(posts[index]);
});

app.delete("/api/posts/:id", async (req, res) => {
  const email = req.headers["email"];
  if (!email) {
    return res.status(401).json({ message: "Email is needed" });
  }

  const id = Number(req.params.id);
  const posts = await readFile("posts.json", true);

  const index = posts.findIndex((el) => el.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "post not found" });
  }

  if (email !== posts[index].email) {
    return res.status(401).json({ error: "You dont have permittion" });
  }

  const deletedPost = posts.splice(index, 1);

  await writeFile("posts.json", JSON.stringify(posts));

  res.status(200).json({ message: "deleted successfully", data: deletedPost });

  res.json(posts[index]);
});

app.put("/api/posts/:id", async (req, res) => {
  const email = req.headers["email"];
  if (!email) {
    return res.status(401).json({ message: "Email is needed" });
  }

  const id = Number(req.params.id);
  const posts = await readFile("posts.json", true);

  const index = posts.findIndex((el) => el.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "post not found" });
  }

  if (email !== posts[index].email) {
    return res.status(401).json({ error: "You dont have permittion" });
  }

  posts[index] = {
    ...posts[index],
    content: req.body?.content,
  };

  await writeFile("posts.json", JSON.stringify(posts));

  res.status(200).json({ message: "updated successfully", data: posts[index] });

  res.json(posts[index]);
});

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
