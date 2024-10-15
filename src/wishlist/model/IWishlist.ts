import { Document } from 'mongoose';

import { ProductDocument } from '../../products/model/IProduct';
import { UserDocument } from '../../users/model/IUser';

export interface IWishlist {
	products: ProductDocument['_id'][];
	user: UserDocument['_id'];
}

interface WishlistActions {
	addProduct(productId: string): Promise<void>;
}

export type WishlistDocument = IWishlist & Document & WishlistActions;