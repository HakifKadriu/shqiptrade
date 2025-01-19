import sharp from "sharp";
import Product from "../models/product.model.js";
const defaultImage = "/defaultImage.jpg";
import path from "path";
import fs from "fs";

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

  const image = req.files.map((file) => file.filename);

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
      image: image.length > 0 ? image : defaultImage,
    });

    await newProduct.save();

    res.json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Product creation failed." });
  }
};

export const getProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Product.find({ createdBy: id }).populate({
      path: "createdBy",
      select: "-password",
    });
    res.json({ success: true, products: products });
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
  const {
    name,
    description,
    price,
    stock,
    category,
    createdBy,
    tags,
    isPublic,
    existingImages,
    defaultImageIndex
  } = req.body;


  const newImages = req.files?.map((file) => file.filename) || [];

  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    var updatedImages = undefined;


    if (!Array.isArray(existingImages) && newImages.length > 0) {
      if (existingImages !== undefined) {
        newImages.push(existingImages);
        updatedImages = newImages;
      } else {
        updatedImages = newImages;
      }
    } else if (Array.isArray(existingImages) && Array.isArray(newImages)) {
      updatedImages = [...existingImages, ...newImages];
    } else if (existingImages){
      updatedImages = [existingImages];
    } else {
      updatedImages = defaultImage;
    }

    const updatedFields = {
      name: name || product.name,
      description: description || product.description,
      price: price || product.price,
      stock: stock || product.stock,
      category: category || product.category,
      createdBy: createdBy._id || product.createdBy._id,
      tags: tags ? tags.split(",") : product.tags,
      isPublic: isPublic !== undefined ? isPublic : product.isPublic,
      image: updatedImages,
      defaultImageIndex: defaultImageIndex || product.defaultImageIndex,
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    ).populate({
      path: "createdBy",
      select: "-password",
    });

    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error.message);
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
      { $match: { isPublic: true } },
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

export const testQuery = async (req, res) => {
  try {
    const result = await Product.updateMany(
      {},
      { createdBy: "6771de24a01705474821c112" }
    );
    res.status(200).json({ message: "test query successful", data: result });
  } catch (error) {
    res.status(500).json({ message: "Error executing test query", error });
  }
};
