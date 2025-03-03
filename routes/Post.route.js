import express from "express";
import { authLimiter, postLimiter } from "../middleware/ratelimitter.js";
const Router = express.Router();
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getpostbyid,
} from "../controllers/Post.controller.js";
import { authMiddleware } from "../middleware/authmiddleware.js";

Router.route("/all").get(getPosts);
Router.route("/:id").get(postLimiter,getpostbyid);

Router.route("/create").post(authMiddleware,postLimiter, createPost);
Router.route("/update/:id").put(authMiddleware,postLimiter, updatePost);
Router.route("/delete/:id").delete(authMiddleware,postLimiter, deletePost);
export default Router;
