const { Router } = require("express");
const userModel = require("../models/user.model");
const postModel = require("../models/post.model");
const isAuth = require("../middlewares/isAuth");

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const users = await userModel.find().populate("posts", "title content");
  res.json(users);
});

userRouter.delete("/:id", isAuth, async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  await postModel.deleteMany({ author: user._id });
  await user.deleteOne();

  res.json({ message: "User and posts deleted" });
});

module.exports = userRouter;
