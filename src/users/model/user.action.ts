import { Schema } from 'mongoose';
import { compare } from 'bcryptjs';

export const addUserAction = (schema: Schema) => {
	schema.methods.comparePassword = async function (password: string) {
		return compare(password, this.password);
	};
};