import { Router } from 'express';

import { productController } from './product.controller';
import auth from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
	productCreateValidation,
	productUpdateValidation,
} from './product.valiadtion';

const router = Router();

router.post(
	'/',
	auth,
	validate(productCreateValidation),
	productController.createProduct,
);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);
router.patch(
	'/:id',
	auth,
	validate(productUpdateValidation),
	productController.updateProduct,
);
router.delete('/:id', auth, productController.deleteProduct);

export default router;
