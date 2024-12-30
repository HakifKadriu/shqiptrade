import express from "express";

import {
  createProduct,
  deleteProduct,
  getProducts,
  getRandomProducts,
  getSingleProduct,
  insertInBulk,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/create-product", createProduct);
router.post("/insertInBulk/", insertInBulk);
router.get("/get-random-products/", getRandomProducts);

router.get("/get-user-products/:id", getProducts);
// router.get('/:id', getSingleProduct);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

export default router;
