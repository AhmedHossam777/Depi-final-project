import { model, Schema, Document } from 'mongoose';

import { ISubCategory } from './ISubCategory';

const subCategorySchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});

export const SubCategory = model<ISubCategory & Document>(
	'SubCategory',
	subCategorySchema
);
