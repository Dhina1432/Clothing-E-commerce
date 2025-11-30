import express from 'express';
import { getProducts, getProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', getProduct);

export default productRouter;