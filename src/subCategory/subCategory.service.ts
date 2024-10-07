import { AppError } from '../utils/AppError';
import { SubCategory } from './model/subCategory.model';
import { ISubCategory } from './model/ISubCategory';

class SubCategoryService {
	async createSubCategory(data: ISubCategory) {
		const subCategory = await SubCategory.create(data);
		return subCategory;
	}

	async getSubCategories() {
		const subCategories = await SubCategory.find().populate('category');
		return subCategories;
	}

	async getSubCategoryById(id: string) {
		const subCategory = await SubCategory.findById(id).populate('category');
		if (!subCategory) {
			throw new AppError('SubCategory not found', 404);
		}

		return subCategory;
	}

	async updateSubCategory(id: string, subCategory: ISubCategory) {
		const newSubCategory = await SubCategory.findByIdAndUpdate(
			id,
			subCategory,
			{
				new: true,
			}
		);
		if (!newSubCategory) {
			throw new AppError('SubCategory not found', 404);
		}

		return newSubCategory;
	}

	async deleteSubCategory(id: string) {
		const deletedSubCategory = await SubCategory.findByIdAndDelete(id);
		if (!deletedSubCategory) {
			throw new AppError('SubCategory not found', 404);
		}
	}
}

export default new SubCategoryService();
