import { Document } from 'mongoose';
import { ProductDocument } from '../../products/model/IProduct';

export interface IUser {
	name: string;
	email: string;
	password: string;
	image: string;
	products: ProductDocument['_id'][];
}

interface UserActions {
	comparePassword(password: string): Promise<boolean>;
}

export type UserDocument = IUser & Document & UserActions;