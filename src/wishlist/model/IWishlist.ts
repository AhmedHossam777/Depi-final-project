import { Document } from 'mongoose';

import { ProductDocument } from '../../products/model/IProduct';

export interface IWishlist {
	products: ProductDocument['_id'][];
}

interface WishlistActions {
	addProduct(productId: string): Promise<void>;
}

export type WishlistDocument = IWishlist & Document & WishlistActions;
