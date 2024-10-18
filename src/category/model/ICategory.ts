import { Document } from 'mongoose';
import { SubCategoryDocument } from '../../subCategory/model/ISubCategory';

export interface ICategory {
	name: string;
	description: string;
	subCategories: SubCategoryDocument['_id'][];
}

export type CategoryDocument = ICategory & Document;
