import { UserDocument } from '../../users/model/IUser';
import { Document } from 'mongoose';

export interface IProduct {
	author: UserDocument['_id'];
	title: string;
	price: number;
	description: string;
	imageURL: string;
	numOfLikes: number;
}

interface ProductActions {
	addLike(): Promise<void>;
}

export type ProductDocument = IProduct & Document & ProductActions;