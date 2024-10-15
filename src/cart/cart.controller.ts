import asyncWrapper from 'express-async-handler';
import cartService from './cart.service';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
	user?: any;
}

class CartController {
	createCart = asyncWrapper(async (req: AuthenticatedRequest, res) => {
		const userId = req.user.id;
		const cart = await cartService.createCart(userId);
		res.status(201).json(cart);
	});

	getCartByUser = asyncWrapper(async (req: AuthenticatedRequest, res) => {
		const userId = req.user.id;
		const cart = await cartService.getCartByUser(userId);
		res.status(200).json(cart);
	});

	addProductToCart = asyncWrapper(async (req: AuthenticatedRequest, res) => {
		const userId = req.user.id;
		const { product } = req.params;
		const cart = await cartService.addProductToCart(userId, product);
		res.status(200).json(cart);
	});

	removeProductFromCart = asyncWrapper(
		async (req: AuthenticatedRequest, res) => {
			const { product } = req.params;
			const userId = req.user.id;
			const cart = await cartService.removeProductFromCart(userId, product);
			res.status(200).json(cart);
		},
	);

	clearCart = asyncWrapper(async (req: AuthenticatedRequest, res) => {
		const userId = req.user.id;
		const cart = await cartService.clearCart(userId);
		res.status(200).json(cart);
	});
}

export default new CartController();