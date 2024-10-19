import asyncWrapper from 'express-async-handler';
import cartService from './cart.service';
import { Request } from 'express';
import { AppError } from '../utils/AppError';

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
		const { productId } = req.params;
		const { quantity } = req.body;
		console.log('product', productId);

		if (!productId) {
			throw new AppError('Product ID is required', 400);
		}

		const cart = await cartService.addProductToCart(
			userId,
			productId,
			quantity
		);
		res.status(200).json(cart);
	});

	removeProductFromCart = asyncWrapper(
		async (req: AuthenticatedRequest, res) => {
			const { productId } = req.params;
			const userId = req.user.id;
			const cart = await cartService.removeProductFromCart(userId, productId);
			res.status(200).json(cart);
		}
	);

	clearCart = asyncWrapper(async (req: AuthenticatedRequest, res) => {
		const userId = req.user.id;
		const cart = await cartService.clearCart(userId);
		res.status(200).json(cart);
	});
}

export default new CartController();
