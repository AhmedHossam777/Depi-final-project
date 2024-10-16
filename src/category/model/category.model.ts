import { model, Schema, Model } from 'mongoose';
import { ICategory } from './ICategory';

const categorySchema = new Schema<ICategory>(
	{
		name: { type: String },
		description: { type: String },
		subCategories: [{ type: Schema.Types.ObjectId, ref: 'SubCategory' }],
	},
	{
		timestamps: true,
	},
);

export const Category = model<ICategory, Model<ICategory>>(
	'Category',
	categorySchema,
);