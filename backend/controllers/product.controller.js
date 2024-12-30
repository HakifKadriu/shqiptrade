import Product from "../models/product.model.js";

// Create and save a new product

export const createProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    stock,
    category,
    createdBy,
    tags,
    isPublic,
  } = req.body;

  try {
    if (!name || !description || !price || !stock || !category || !createdBy) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields.",
      });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      createdBy,
      tags,
      isPublic,
    });

    await newProduct.save();
    res.json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Product.find({ createdBy: id }).populate(
      "createdBy"
    );
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
  const { id: productId } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    console.log("Error in deleting product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getRandomProducts = async (req, res) => {
  try {
    const count = Number(req.query.count);
    const randomProducts = await Product.aggregate([
      { $sample: { size: count } },
    ]);

    const populatedProducts = await Product.populate(randomProducts, {
      path: "createdBy",
      select: "-password",
    });

    res.json({ success: true, data: populatedProducts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching random products", error });
  }
};

export const insertInBulk = async (req, res) => {
  try {
    const products = req.body;
    const insertedProducts = await Product.insertMany(products);
    res.status(201).json({ success: true, data: insertedProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
