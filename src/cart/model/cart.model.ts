import { model, Schema, Model } from 'mongoose';

import { ICart } from './ICart';

const cartSchema = new Schema<ICart>(
	{
		products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{
		timestamps: true,
	},
);

export const Cart = model<ICart, Model<ICart>>('Cart', cartSchema);