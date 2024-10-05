import { Schema } from 'mongoose';
import { compare, hash } from 'bcryptjs';

export const addUserAction = (schema: Schema) => {
	schema.pre('save', async function (next) {
		if (!this.isModified('password')) return next();
		this.password = await hash(this.password as string, 12);
		next();
	});

	schema.methods.comparePassword = async function (password: string) {
		return compare(password, this.password);
	};

	schema.methods.addProduct = async function (productId: string) {
		this.products.push(productId);
		await this.save();
	};
};