import { AppError } from '../utils/AppError';
import { Wishlist } from './model/wishlist.model';
import { ObjectId } from 'mongoose';

export class WishlistService {
	async addProductToWishlist(userId: string, productId: string) {
		const wishlist = await Wishlist.findOne({ user: userId.toString() });
		if (!wishlist) {
			throw new AppError('Wishlist not found', 404);
		}
		if (wishlist.products.includes(productId)) {
			throw new AppError('Product already in wishlist', 400);
		}

		wishlist.products.push(productId);

		await wishlist.save();

		return wishlist;
	}

	async removeProductFromWishlist(userId: string, productId: string) {
		const wishlist = await Wishlist.findOne({ user: userId.toString() });
		if (!wishlist) {
			throw new AppError('Wishlist not found', 404);
		}
		wishlist.products = wishlist.products.filter(
			(product) => (product as ObjectId).toString() !== productId,
		);
		await wishlist.save();
	}

	async getWishlist(userId: string) {
		const wishlist = await Wishlist.findOne({
			user: userId.toString(),
		}).populate('products');

		console.log(wishlist);

		if (!wishlist) {
			throw new AppError('Wishlist not found', 404);
		}
		return wishlist;
	}

	async clearWishlist(userId: string) {
		const wishlist = await Wishlist.findOne({ user: userId.toString() });
		if (!wishlist) {
			throw new AppError('Wishlist not found', 404);
		}
		wishlist.products = [];
		await wishlist.save();
	}

	async createWishlist(userId: string) {
		const existingWishlist = await Wishlist.findOne({
			user: userId.toString(),
		});
		if (existingWishlist) {
			throw new AppError('Wishlist already exists', 400);
		}
		const wishlist = await Wishlist.create({ user: userId });
		return wishlist;
	}

	async deleteWishlist(userId: string) {
		const wishlist = await Wishlist.findOneAndDelete({
			user: userId.toString(),
		});
		if (!wishlist) {
			throw new AppError('Wishlist not found', 404);
		}
	}
}

export const wishlistService = new WishlistService();