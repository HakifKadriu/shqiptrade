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
  updateProduct,
} from "../controllers/product.controller.js";
import Product from "../models/product.model.js";

const router = express.Router();

router.post("/create-product", upload.single("image"), createProduct);
router.post("/insertInBulk/", insertInBulk);
router.get("/get-random-products/", getRandomProducts);
router.delete("/deleteAllProducts/", async (req, res) => {
  await Product.deleteMany();
  res.status(200).json({ message: "All products deleted successfully" });
});

router.get("/get-user-products/:id", getProducts);
// router.get('/:id', getSingleProduct);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

export default router;
