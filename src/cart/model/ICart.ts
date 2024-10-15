import { Document } from 'mongoose';
import { ProductDocument } from '../../products/model/IProduct';
import { UserDocument } from '../../users/model/IUser';

export interface ICart {
	products: ProductDocument['_id'][];
	user: UserDocument['_id'];
}

export type CartDocument = ICart & Document;