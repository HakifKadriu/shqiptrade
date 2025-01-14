import Product from "../models/product.model.js";
const defaultImage = "/defaultImage.jpg";

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
      image: image,
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
    const products = await Product.find({ createdBy: id }).populate(
      "createdBy"
    );
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
  } = req.body;

  // Get new image filenames from uploaded files
  const newImages = req.files?.map((file) => file.filename) || [];

  console.log("Existing Images", existingImages);
  console.log("New Images", newImages);

  // const combinedImages = [...images, ...newImages];

  const { id } = req.params;

  try {
    // Find the product to update
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
    } else {
      console.log("None are arrays");
      updatedImages = [defaultImage];
    }

    // Prepare updated fields
    const updatedFields = {
      name: name || product.name,
      description: description || product.description,
      price: price || product.price,
      stock: stock || product.stock,
      category: category || product.category,
      createdBy: createdBy || product.createdBy,
      tags: tags ? tags.split(",") : product.tags, // Convert tags to an array if provided
      isPublic: isPublic !== undefined ? isPublic : product.isPublic,
      image: updatedImages,
    };

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true } // Return the updated document
    );

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
