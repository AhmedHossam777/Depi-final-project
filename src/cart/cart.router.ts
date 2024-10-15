import { Router } from 'express';
import cartController from './cart.controller';
import auth from '../middleware/auth';

const cartRouter = Router();

cartRouter.post('/', auth, cartController.createCart);
cartRouter.get('/', auth, cartController.getCartByUser);
cartRouter.post('/:product', auth, cartController.addProductToCart);
cartRouter.delete('/:product', auth, cartController.removeProductFromCart);
cartRouter.delete('/', auth, cartController.clearCart);