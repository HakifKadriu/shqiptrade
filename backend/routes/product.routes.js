import express from 'express';

import { createProduct, deleteProduct, getProducts, getSingleProduct, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getSingleProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;