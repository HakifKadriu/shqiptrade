import express from "express";
import { upload } from "../utils/multerUtils.js";
import path from "path";

import {
  createProduct,
  deleteProduct,
  getProducts,
  getRandomProducts,
  getSingleProduct,
  insertInBulk,
  testQuery,
  updateProduct,
} from "../controllers/product.controller.js";
import Product from "../models/product.model.js";
import multer from "multer";

const router = express.Router();

router.post("/create-product", upload.array("images"), createProduct);
router.post("/insertInBulk/", insertInBulk);
router.get("/get-random-products/", getRandomProducts);
router.put("/testQuery/", testQuery);
router.delete("/deleteAllProducts/", async (req, res) => {
  await Product.deleteMany();
  res.status(200).json({ message: "All products deleted successfully" });
});

router.get("/get-user-products/:id", getProducts);
router.get('/get-single-product/:id', getSingleProduct);
router.put("/update-product/:id", upload.array("newImages"), updateProduct);
router.delete("/delete-product/:id", deleteProduct);

router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size is too large. Max size is 5MB',
      });
    }
    if (err.code === 'INVALID_FILE_TYPE') {
      return res.status(400).json({
        success: false,
        message: 'Invalid file type. Only .jpg, .jpeg, and .png are allowed.',
      });
    }
  } else if (err) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err.message,
    });
  }
  next();
});

export default router;
