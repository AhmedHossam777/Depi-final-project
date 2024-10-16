import { UserDocument } from '../../users/model/IUser';
import { Document } from 'mongoose';
import { SubCategoryDocument } from '../../subCategory/model/ISubCategory';

export interface IProduct {
	author: UserDocument['_id'];
	title: string;
	price: number;
	description: string;
	imageURL?: string;
	numOfLikes?: number | null;
	subCategory: SubCategoryDocument['_id'];
}

interface ProductActions {
	addLike(): Promise<void>;
}

export type ProductDocument = IProduct & Document & ProductActions;