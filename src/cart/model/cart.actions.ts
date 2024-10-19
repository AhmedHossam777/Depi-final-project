import { Schema } from 'mongoose';

export const addCartAction = (schema: Schema) => {
	schema.methods.addProduct = async function (productId: string) {
		this.products.push(productId);
		await this.save();
	};
};
