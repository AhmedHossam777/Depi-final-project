import { Document } from 'mongoose';
import { ProductDocument } from '../../products/model/IProduct';

export interface ICategory {
	name: string;
	description: string;
	products: ProductDocument['_id'][];
}

export type CategoryDocument = ICategory & Document;