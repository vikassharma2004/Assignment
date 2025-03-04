import express from "express"
import { addtocart, getcart, removefromcart, updatequantity } from "../controllers/Cart.controller.js"
import { isAuthenticated } from "../middleware/authmiddleware.js"
import { rateLimiter } from "../middleware/ratelimitter.js"
const router=express.Router()

router.route("/").get(isAuthenticated,rateLimiter,getcart)
router.route("/").post(isAuthenticated,rateLimiter,addtocart)
router.route("/").delete(isAuthenticated,rateLimiter,removefromcart)
router.route("/:id").put(isAuthenticated,rateLimiter,updatequantity)

export default router