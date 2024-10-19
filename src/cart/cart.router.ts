import { Router } from 'express';
import cartController from './cart.controller';
import auth from '../middleware/auth';

const cartRouter = Router();

cartRouter.post('/', auth, cartController.createCart);
cartRouter.get('/', auth, cartController.getCartByUser);
cartRouter.post('/product/:productId', auth, cartController.addProductToCart);
cartRouter.delete(
	'/product/:productId',
	auth,
	cartController.removeProductFromCart
);
cartRouter.delete('/', auth, cartController.clearCart);

export default cartRouter;
