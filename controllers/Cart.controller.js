
import mongoose from "mongoose";
import { Product } from "../models/Product.schema.js";
import { User } from "../models/User.Schema.js";





export const addtocart = async (req, res) => {
  try {
    const productId = req.body.productId;
    const userId = req.user;

    
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid Product ID", success: false });
    }

   
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found", success: false });
    }

  
    const existingItem = user.cartitems.find(item => item.product.toString() === productId.toString());

    if (existingItem) {
      
       return res.status(400).json({ message: "Product already in cart", success: false });
    } else {
       
        user.cartitems.push({ product: productId, quantity: 1 });
    }

    
    user.markModified('cartitems');

   
    await user.save();

 
    res.status(201).json({ cart: user.cartitems, success: true ,message:"Product added to cart successfully"});
} catch (error) {
    console.error("Error:", error); 
    res.status(500).json({ message: "Server error", error: error.message });
}
};


export const removefromcart = async (req, res) => {
    try {
        
        const {productid}=req.body;
        const user=req.user;
        if(!productid){
            user.cartitems=[];
        }   else{
            user.cartitems=user.cartitems.filter(item=>item!=productid);
        }
        await user.save();
        res.json({message:"Product removed from cart successfully",cart:user.cartitems,success:true});
    } catch (error) {
        console.log("Error in removefromcart controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
        
    }
};

export const updatequantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;

   
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid Product ID", success: false });
    }

    let updatedUser;

    if (quantity === 0) {
        
        updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { cartitems: { product: productId } }}, 
            { new: true } 
        );
    } else {
        
        updatedUser = await User.findOneAndUpdate(
            { _id: req.user._id, "cartitems.product": productId }, 
            { $set: { "cartitems.$.quantity": quantity } }, 
            { new: true } 
        );
    }

    if (!updatedUser) {
        return res.status(404).json({ message: "Product not found in cart" });
    }

    // Return the updated cart items
    res.json(updatedUser.cartitems,{message:"Product quantity updated successfully",success:true});
} catch (error) {
    console.log("Error in updateQuantity controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
}
}

export const getcart = async (req, res) => {
  try {
    
    const user = await User.findById(req.user._id).populate({
        path: 'cartitems.product',
        match: { _id: { $exists: true } } 
    });

    if (!user) {
        return res.status(404).json({ message: "User not found", success: false });
    }

    // Filter out cart items with missing products
    user.cartitems = user.cartitems.filter(cartItem => cartItem.product !== null);

    // Map the cart items with product details and quantities
    const cartItems = user.cartitems.map(cartItem => ({
        ...cartItem.product.toJSON(), 
        quantity: cartItem.quantity 
    }));

    // Send the response
    res.json(cartItems);
} catch (error) {
    console.log("Error in getCartProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
}
}