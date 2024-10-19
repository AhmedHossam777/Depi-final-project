import { Document } from 'mongoose';
import { ProductDocument } from '../../products/model/IProduct';
import { UserDocument } from '../../users/model/IUser';

export interface ICart {
	products: {
		product: ProductDocument['_id'];
		quantity: number;
	}[];

	user: UserDocument['_id'];
}

interface CartActions {
	addProduct(productId: string): Promise<void>;
}

export type CartDocument = ICart & Document;
