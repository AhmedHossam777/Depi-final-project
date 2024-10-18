import { model, Schema, Model } from 'mongoose';
import { IUser, UserDocument } from './IUser';
import { addUserAction } from './user.action';

const userSchema = new Schema<IUser>(
	{
		displayName: { type: String },
		email: { type: String },
		password: { type: String, select: false },
		profilePhoto: { type: String, default: '' },
		products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
		admin: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

addUserAction(userSchema);

export const User = model<IUser, Model<UserDocument>>('User', userSchema);
