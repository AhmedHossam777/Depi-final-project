import { Product } from './model/product.model';
import { AppError } from '../utils/AppError';
import { IProduct } from './model/IProduct';
import { User } from '../users/model/user.model';

class ProductService {
	createProduct = async (data: IProduct, user: any) => {
		const product = new Product(data);
		product.author = user._id;
		const author = await User.findById(user._id);
		author?.products.push(product._id);
		await Promise.all([product.save(), author?.save()]);
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

	updateProduct = async (
		id: string,
		data: Partial<IProduct>,
		user: { _id: string },
	) => {
		const product = await Product.findById(id);
		if (!product) throw new AppError('product not found', 404);
		const author = product.author as string;

		console.log(author, user._id); // new ObjectId('6700ee624c8fd5d7e295d633') new ObjectId('6700ee624c8fd5d7e295d633')

		if (author.toString() !== user._id.toString()) {
			throw new AppError('You are not allowed to update this product', 403);
		}

		const updatedProduct = await Product.findByIdAndUpdate(id, data, {
			new: true,
		});

		return updatedProduct;
	};

	deleteProduct = async (id: string, user: { _id: string }) => {
		const product = await Product.findById(id);
		if (!product) throw new AppError('product not found', 404);
		const author = product.author as string;

		console.log(author, user._id); // new ObjectId('6700ee624c8fd5d7e295d633') new ObjectId('6700ee624c8fd5d7e295d633')

		if (author.toString() !== user._id.toString()) {
			throw new AppError('You are not allowed to delete this product', 403);
		}

		await Product.findByIdAndDelete(id);

		const productAuthor = await User.findById(author);
		for (let i = 0; i < (productAuthor?.products as string[]).length; i++) {
			if ((productAuthor?.products[i] as string).toString() === id) {
				productAuthor?.products.splice(i, 1);
			}
		}
		await productAuthor?.save();
	};
}

export const productService = new ProductService();