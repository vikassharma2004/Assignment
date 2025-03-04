import { Order } from "../models/Order.schema.js";
import { Product } from "../models/Product.schema.js";
import mongoose from "mongoose";
export const PlaceOrder = async (req, res) => {
   

    try {
        const user = req.user; 
        const { productId } = req.body; 
    
       
        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
          return res.status(400).json({ message: "Invalid Product ID", success: false });
        }
    
       
        const cartItem = user.cartitems.find((item) => item.product.toString() === productId);
    
        if (!cartItem) {
          return res.status(400).json({ message: "Product not added to cart", success: false });
        }
    
        // fetch product 
        const product = await Product.findById(productId);
    
        if (!product) {
          return res.status(404).json({ message: "Product not found", success: false });
        }
    
       
        const totalPrice = product.price * cartItem.quantity;
    
     
        const order = new Order({
          user: user._id,
          items: [
            {
              product: productId,
              quantity: cartItem.quantity,
            },
          ],
          totalPrice,
          orderStatus: "Processing", 
        });
    
      
        await order.save();
    
        
        user.cartitems = user.cartitems.filter((item) => item.product.toString() !== productId);
        await user.save();
    
       
        res.status(201).json({ order, success: true , message:"Order placed successfully"});
      } catch (error) {
        console.log("Error in POST /api/orders:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
      }
    
    
}
;
export const getOrders = async (req, res) => {
    try {
        const user = req.user;
    
        
        const orders = await Order.find({ user: user._id }).populate({
          path: "items.product",
          
        });
    
        
        res.json({ orders, success: true,message:"Orders fetched successfully"});
      } catch (error) {
        console.log("Error in GET /api/orders:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
      }
}