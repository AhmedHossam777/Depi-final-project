import { Router } from 'express';

import { productController } from './product.controller';
import auth from '../middleware/auth';

const router = Router();

router.post('/', auth, productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);
router.patch('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);

export default router;