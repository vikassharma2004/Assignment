import express from "express";
import { authLimiter, postLimiter } from "../middleware/ratelimitter.js";
import { isAuthenticated,adminRoute } from "../middleware/authmiddleware.js";
import { getProducts,getProductById,createProduct,updateProduct,deleteProduct } from "../controllers/product.controller.js";
const Router = express.Router();

Router.route("/").get(postLimiter,getProducts);
Router.route("/:id").get(postLimiter,getProductById);

Router.route("/").post(isAuthenticated,adminRoute,postLimiter, createProduct);
Router.route("/:id").put(isAuthenticated,adminRoute,postLimiter, updateProduct);
Router.route("/:id").delete(isAuthenticated,adminRoute,postLimiter, deleteProduct);
export default Router;
