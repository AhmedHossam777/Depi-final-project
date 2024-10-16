import { AppError } from '../utils/AppError';
import { Category } from './model/category.model';
import { ICategory } from './model/ICategory';

class CategoryService {
	async createCategory(name: string, description: string) {
		const category = new Category({ name, description });
		await category.save();
		return category;
	}

	async getCategories() {
		const categories = await Category.find();
		return categories;
	}

	async getCategoryById(id: string) {
		const category = await Category.findById(id);
		if (!category) {
			throw new AppError('Category not found', 404);
		}
		return category;
	}

	async updateCategory(id: string, data: Partial<ICategory>) {
		const category = await Category.findByIdAndUpdate(id, data, { new: true });
		if (!category) {
			throw new AppError('Category not found', 404);
		}

		return category;
	}

	async deleteCategory(id: string) {
		const category = await Category.findByIdAndDelete(id);
		if (!category) {
			throw new AppError('Category not found', 404);
		}
	}
}

export default new CategoryService();