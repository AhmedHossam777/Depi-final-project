import { wishlistService } from './wishlist.service';
import asyncWrapper from 'express-async-handler';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
	user?: any;
}

class WishlistController {
	getWishlist = asyncWrapper(async (req: AuthenticatedRequest, res) => {
		const wishlist = await wishlistService.getWishlist(req.user._id);
		res.json(wishlist);
	});

	clearWishlist = asyncWrapper(async (req: AuthenticatedRequest, res) => {
		await wishlistService.clearWishlist(req.user._id);
		res.json({ message: 'Wishlist cleared' });
	});

	createWishlist = asyncWrapper(async (req: AuthenticatedRequest, res) => {
		const wishlist = await wishlistService.createWishlist(req.user._id);
		res.json(wishlist);
	});

	deleteWishlist = asyncWrapper(async (req: AuthenticatedRequest, res) => {
		await wishlistService.deleteWishlist(req.user._id);
		res.json({ message: 'Wishlist deleted' });
	});

	addProductToWishlist = asyncWrapper(
		async (req: AuthenticatedRequest, res) => {
			const wishlist = await wishlistService.addProductToWishlist(
				req.user._id,
				req.params.id,
			);
			res.json({ message: 'Product added to wishlist', wishlist });
		},
	);

	removeProductFromWishlist = asyncWrapper(
		async (req: AuthenticatedRequest, res) => {
			await wishlistService.removeProductFromWishlist(
				req.user._id,
				req.params.id,
			);
			res.json({ message: 'Product removed from wishlist' });
		},
	);
}

export const wishlistController = new WishlistController();