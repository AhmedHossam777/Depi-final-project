import { UserDocument } from '../../users/model/IUser';
import { Document } from 'mongoose';
import { CategoryDocument } from '../../category/model/ICategory';

export interface IProduct {
	author: UserDocument['_id'];
	title: string;
	price: number;
	description: string;
	imageURL: string;
	numOfLikes: number;
	category: CategoryDocument['_id'];
}

interface ProductActions {
	addLike(): Promise<void>;
}

export type ProductDocument = IProduct & Document & ProductActions;