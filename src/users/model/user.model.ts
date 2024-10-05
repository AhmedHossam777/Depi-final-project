import { model, Schema, Model } from 'mongoose';
import { IUser, UserDocument } from './IUser';
import { addUserAction } from './user.action';

const userSchema = new Schema<IUser>(
	{
		name: { type: String },
		email: { type: String },
		password: { type: String, select: false },
		image: { type: String, default: '' },
		products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
	},
	{ timestamps: true },
);

addUserAction(userSchema);

export const User = model<IUser, Model<UserDocument>>('User', userSchema);