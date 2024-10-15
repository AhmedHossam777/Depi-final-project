import { IWishlist, WishlistDocument } from './IWishlist';
import { Model, model, Schema } from 'mongoose';

import { addWishlistAction } from './wishlist.action';

const wishlistSchema = new Schema<IWishlist>(
	{
		products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{ timestamps: true },
);

addWishlistAction(wishlistSchema);

export const Wishlist = model<IWishlist, Model<WishlistDocument>>(
	'Wishlist',
	wishlistSchema,
);