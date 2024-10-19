import { model, Schema, Model } from 'mongoose';

import { ICart } from './ICart';
import { addCartAction } from './cart.actions';

const cartSchema = new Schema<ICart>(
	{
		products: [
			{
				product: {
					type: Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
				quantity: { type: Number, default: 1 },
				_id: false,
			},
		],
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{
		timestamps: true,
	}
);

addCartAction(cartSchema);

export const Cart = model<ICart, Model<ICart>>('Cart', cartSchema);
