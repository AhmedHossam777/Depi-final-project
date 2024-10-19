import { AppError } from '../utils/AppError';
import { Cart } from './model/cart.model';

class CartService {
	async createCart(user: string) {
		const cart = new Cart({ user });
		await cart.save();
		return cart;
	}

	async getCartByUser(user: string) {
		const cart = await Cart.findOne({ user: user.toString() });

		if (!cart) {
			throw new AppError('Cart not found', 404);
		}
		return cart;
	}

	async addProductToCart(user: string, product: string, quantity: number) {
		const cart = await Cart.findOne({ user });
		if (!cart) {
			throw new AppError('Cart not found', 404);
		}
		const productIndex = cart.products.findIndex(
			(p) => (p?.product as string).toString() === product
		);

		if (!quantity) {
			quantity = 1;
		}

		if (productIndex !== -1) {
			cart.products[productIndex].quantity += quantity;
		} else {
			cart.products.push({ product, quantity });
		}
		await cart.save();
		return cart;
	}

	async removeProductFromCart(user: string, product: string) {
		const cart = await Cart.findOne({ user });
		if (!cart) {
			throw new AppError('Cart not found', 404);
		}
		const productIndex = cart.products.findIndex(
			(p) => (p?.product as string).toString() === product
		);
		if (productIndex === -1) {
			throw new AppError('Product not found in cart', 404);
		}
		cart.products.splice(productIndex, 1);
		await cart.save();
		return cart;
	}

	async clearCart(user: string) {
		const cart = await Cart.findOne({ user });
		if (!cart) {
			throw new AppError('Cart not found', 404);
		}
		cart.products = [];

		await cart.save();
		return cart;
	}
}

export default new CartService();
