import Product from "../models/product.model.js";

// Create and save a new product

export const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    const newProduct = new Product({ name, price });
    const savedProduct = await newProduct.save();

    res.status(201).json({ success: true, data: savedProduct });
  } catch (error) {
    console.log("Error in creating new Product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({updatedAt: 'desc'});
    res.json({ success: true, data: products });
  } catch (error) {
    console.log("Error in getting products", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    console.log("Error in getting single product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { name, price } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, price },
      { new: true }
    );
    res.json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log("Error in updating product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, data: deletedProduct });
  } catch (error) {
    console.log("Error in deleting product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
