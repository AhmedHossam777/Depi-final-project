import { wishlistController } from './wishlist.controller';
import express from 'express';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/', auth, wishlistController.getWishlist);
router.post('/', auth, wishlistController.createWishlist);
router.delete('/', auth, wishlistController.clearWishlist);
router.delete('/:id', auth, wishlistController.deleteWishlist);
router.post('/:id', auth, wishlistController.addProductToWishlist);
router.delete('/:id', auth, wishlistController.removeProductFromWishlist);

export default router;
