import { Product } from './model/product.model';
import { AppError } from '../utils/AppError';
import { IProduct } from './model/IProduct';

class ProductService {
	createProduct = async (data: IProduct) => {
		const product = await Product.create(data);
		if (!product) throw new AppError('error while creating a product', 400);
		return product;
	};

	getAllProducts = async () => {
		return Product.find();
	};

	getProduct = async (id: string) => {
		const product = await Product.findById(id);
		if (!product) throw new AppError('product not found', 404);
		return product;
	};

	updateProduct = async (id: string, data: Partial<IProduct>) => {
		const newProduct = await Product.findByIdAndUpdate(id, data, { new: true });
		if (!newProduct) throw new AppError('product not found', 404);
		return newProduct;
	};

	deleteProduct = async (id: string) => {
		const product = await Product.findByIdAndDelete(id);
		if (!product) throw new AppError('product not found', 404);
	};
}

export const productService = new ProductService();