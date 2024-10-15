import { AppError } from '../utils/AppError';
import { Cart } from './model/cart.model';

class CartService {
	async createCart(user: string) {
		const cart = new Cart({ user });
		await cart.save();
		return cart;
	}

	async getCartByUser(user: string) {
		const cart = await Cart.findOne({ user }).populate('products');
		if (!cart) {
			throw new AppError('Cart not found', 404);
		}
		return cart;
	}

	async addProductToCart(user: string, product: string) {
		const cart = await Cart.findOne({ user });
		if (!cart) {
			throw new AppError('Cart not found', 404);
		}
		cart.products.push(product);
		await cart.save();
		return cart;
	}

	async removeProductFromCart(user: string, product: string) {
		const cart = await Cart.findOne({ user });
		if (!cart) {
			throw new AppError('Cart not found', 404);
		}
		cart.products = cart.products.filter((p) => p?.toString() !== product);
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