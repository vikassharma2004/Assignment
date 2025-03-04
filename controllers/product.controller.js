import { Product } from "../models/Product.schema.js";



export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("createdBy");
    res.json({ products, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, quantity,image } = req.body;
    console.log(req.body);
    
    if (!name || !description || !price || !category || !stock || !quantity || !image) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const product = new Product({
      name,
      description,
      price,
      image,
      category,
      stock,
      quantity,
      createdBy: req.user._id,
    });

    await product.save();

    res.status(201).json({
      product,
      success: true,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image, category, stock } = req.body;

    if (!name || !description || !price  || !category || !stock) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    

    // Find the product
    const product = await Product.findById(id).populate("createdBy");
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }


    if(product.createdBy.toString() !== req.user._id.toString()){
      return res.status(401).json({ message: "Unauthorized you are not owner", success: false });
    }
    product.name = name;
    product.description = description;
    product.price = price;
    product.image = image;
    product.category = category;
    product.stock = stock;
    await product.save();

    res.json({
      message: "Product updated successfully",
      product,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if(product.createdBy.toString() !== req.user._id.toString()){
      return res.status(401).json({ message: "Unauthorized you are not owner", success: false });
    }
   

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate("createdBy");
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    res.status(200).json({ product, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
