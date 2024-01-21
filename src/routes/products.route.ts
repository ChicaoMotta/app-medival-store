import express from 'express';
import productsController from '../controller/products.controller';
import validateProductSchema from '../middleware/validateProductBody';

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.post('/', validateProductSchema, productsController.insertProduct);

export default router;