import { Document } from 'mongoose';
import { CategoryDocument } from '../../category/model/ICategory';
import { ProductDocument } from '../../products/model/IProduct';

export interface ISubCategory {
	name: string;
	description: string;
	category: CategoryDocument['_id'];
	products: ProductDocument['_id'][];
}

export type SubCategoryDocument = ISubCategory & Document;