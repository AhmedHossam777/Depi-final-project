import { Document } from 'mongoose';
import { ProductDocument } from '../../products/model/IProduct';

export interface IUser {
	displayName: string;
	email: string;
	password: string;
	profilePhoto: string;
	products: ProductDocument['_id'][];
	admin: boolean;
}

interface UserActions {
	comparePassword(password: string): Promise<boolean>;
}

export type UserDocument = IUser & Document & UserActions;
