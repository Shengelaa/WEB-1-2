const { Router } = require("express");
const postModel = require("../models/post.model");
const isAuth = require("../middlewares/isAuth");

const userModel = require("../models/user.model");

const postRouter = Router();

postRouter.get("/", isAuth, async (req, res) => {
  const posts = await postModel.find().populate("author", "fullName email");
  res.json(posts);
});

postRouter.post("/", isAuth, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ error: "required fields are missing" });

  const post = await postModel.create({ title, content, author: req.userId }); // save author

  await userModel.findByIdAndUpdate(req.userId, {
    $push: { posts: post._id },
  });

  res.status(201).json({ message: "created successfully", post });
});
postRouter.delete("/:postId", isAuth, async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.author.toString() !== req.userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this post" });
    }

    await postModel.findByIdAndDelete(postId);

    await userModel.findByIdAndUpdate(req.userId, {
      $pull: { posts: postId },
    });

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
postRouter.put("/:postId", isAuth, async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;

  if (!title || !content)
    return res.status(400).json({ error: "required fields are missing" });

  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.author.toString() !== req.userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this post" });
    }

    post.title = title;
    post.content = content;

    await post.save();

    res.json({ message: "Post updated successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = postRouter;
