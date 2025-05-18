const { Router } = require("express");
const {
  getAllPosts,
  createPost,
  getPostById,
  deletePostById,
  updatePostById,
} = require("./posts.service");
const hasKey = require("../../middlewares/Haskey");

const postRoute = Router();

postRoute.get("/", getAllPosts);
postRoute.post("/", hasEmailMiddleware, createPost);
postRoute.get("/:id", getPostById);
postRoute.delete("/:id", hasEmailMiddleware, deletePostById);
postRoute.put("/:id", hasEmailMiddleware, updatePostById);

module.exports = postRoute;
