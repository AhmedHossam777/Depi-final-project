import { model, Schema, Document, Model } from 'mongoose';
import { IUser, UserDocument } from './IUser';
import { hash, compare } from 'bcryptjs';
import { addUserAction } from './user.action';

const userSchema = new Schema<IUser>(
	{
		name: { type: String },
		email: { type: String },
		password: { type: String, select: false },
		image: { type: String, default: '' },
	},
	{ timestamps: true },
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	this.password = await hash(this.password, 10);
});

addUserAction(userSchema);

export const User = model<IUser, Model<UserDocument>>('User', userSchema);