import { model, Schema, Model } from 'mongoose';
import { IProduct, ProductDocument } from './IProduct';

const productSchema = new Schema<IProduct>(
	{
		title: { type: String },
		price: { type: Number },
		description: { type: String },
		imageURL: { type: String },
		numOfLikes: { type: Number, default: 0 },
		author: { type: Schema.Types.ObjectId, ref: 'User' },
		subCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
	},
	{
		timestamps: true,
	},
);

productSchema.methods.addLike = async function () {
	this.numOfLikes += 1;
	await this.save();
};

export const Product = model<IProduct, Model<ProductDocument>>(
	'Product',
	productSchema,
);