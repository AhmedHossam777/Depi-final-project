import { Document } from 'mongoose';
import { CategoryDocument } from '../../category/model/ICategory';

export interface ISubCategory {
	name: string;
	description: string;
	category: CategoryDocument['_id'];
}

export type SubCategoryDocument = ISubCategory & Document;
