const express = require("express");
const multer = require("multer");
const path = require("path");
const { upload, deleteFromCloudinary } = require("./config/cloudinary.config");
const fs = require("fs/promises");
const cors = require("cors");

const app = express();
app.use(express.json()); // body defined iqneba tuar dawer
app.use(cors());
app.use(express.static("uploads")); // nebismier folders irchev xdeba statikuri da hostze misawvdomi.

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     const fileName = Date.now() + path.extname(file.originalname);
//     cb(null, fileName);
//   },
// });

// const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/upload", upload.single("image"), (req, res) => {
  console.log("shemovida", req.file);
  res.status(201).json({
    message: "uploaded successfylly",
    url: req.file.path,
  });
});

app.get("/users", async (req, res) => {
  const users = JSON.parse(await fs.readFile("users.json", "utf-8"));
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const users = JSON.parse(await fs.readFile("users.json", "utf-8"));
  const user = users.find((el) => el.id === id);
  res.json(user);
});

app.put("/users/:id", upload.single("avatar"), async (req, res) => {
  const { fullName, email } = req.body;
  const id = Number(req.params.id);
  const users = JSON.parse(await fs.readFile("users.json", "utf-8"));
  const index = users.findIndex((el) => el.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "user not found" });
  }

  users[index] = {
    id: id,
    fullName,
    email,
    avatar: req.file?.path || users[index].avatar,
  };

  await fs.writeFile("users.json", JSON.stringify(users));
  res.status(201).json({ message: "created" });
});

app.post("/users", upload.single("avatar"), async (req, res) => {
  const { fullName, email } = req.body;
  if (!fullName || !email) {
    return res.status(400).json(error, "error");
  }

  const users = JSON.parse(await fs.readFile("users.json", "utf-8"));
  const lastId = users[users.length - 1]?.id || 0;

  const newUser = {
    id: lastId + 1,
    fullName,
    email,
    avatar: req.file.path,
  };
  users.push(newUser);

  await fs.writeFile("users.json", JSON.stringify(users));
  res.status(201).json({ message: "created" });
});

app.delete("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const users = JSON.parse(await fs.readFile("users.json", "utf-8"));
  const index = users.findIndex((el) => el.id === id);
  const fileName = users[index].avatar.split("uploads/")[1];
  const fileId = fileName.split(".")[0];
  const publicFileId = `uploads/${fileId}`;
  await deleteFromCloudinary(publicFileId);

  users.splice(index, 1);
  await fs.writeFile("users.json", JSON.stringify(users));
  res.json({ messagE: "scces" });
});

app.listen(4000, () => {
  console.log("server running on http://localhost:4000");
});

//npm install cloudinary multer multer-storage-cloudinary dotenv
