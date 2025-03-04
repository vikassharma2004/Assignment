import express from "express";

import { getOrders, PlaceOrder } from "../controllers/Order.controller.js";
import { isAuthenticated } from "../middleware/authmiddleware.js";
import { rateLimiter } from "../middleware/ratelimitter.js";

const router = express.Router();


router.route("/").post(isAuthenticated, rateLimiter,PlaceOrder);
router.route("/").get(isAuthenticated, rateLimiter,getOrders);


export default router;