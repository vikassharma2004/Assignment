import express from "express";
const Router = express.Router();
import { register, login,logout,getprofile } from "../controllers/Auth.controller.js";
import { authLimiter } from "../middleware/ratelimitter.js";
import { authMiddleware } from "../middleware/authmiddleware.js";

Router.route("/register").post(authLimiter,register);
Router.route("/login").post(authLimiter,login);
Router.route("/logout").post(logout);
Router.route("/profile").get(authMiddleware,getprofile);



export default Router;
