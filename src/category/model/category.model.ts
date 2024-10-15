import { model, Schema, Model } from 'mongoose';
import { ICategory } from './ICategory';

const categorySchema = new Schema<ICategory>(
	{
		name: { type: String },
		description: { type: String },
		products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
	},
	{
		timestamps: true,
	},
);

export const Category = model<ICategory, Model<ICategory>>(
	'Category',
	categorySchema,
);