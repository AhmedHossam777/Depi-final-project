import { AppError } from '../utils/AppError';
import { SubCategory } from './model/subCategory.model';
import { ISubCategory } from './model/ISubCategory';
import { Category } from '../category/model/category.model';
import mongoose from 'mongoose';

class SubCategoryService {
	async createSubCategory(data: Partial<ISubCategory>) {
		const category = await Category.findById(data.category);
		if (!category) {
			throw new AppError('Category not found', 404);
		}

		const subCategory = new SubCategory(data);

		[category.subCategories].push(subCategory._id);

		await Promise.all([subCategory.save(), category.save()]);
		return subCategory;
	}

	async getSubCategories() {
		const subCategories = await SubCategory.find()
			.populate('category')
			.populate('products');
		return subCategories;
	}

	async getSubCategoryById(id: string) {
		const subCategory = await SubCategory.findById(id)
			.populate('category')
			.populate('products');
		if (!subCategory) {
			throw new AppError('SubCategory not found', 404);
		}

		return subCategory;
	}

	async updateSubCategory(id: string, subCategory: Partial<ISubCategory>) {
		const newSubCategory = await SubCategory.findByIdAndUpdate(
			id,
			subCategory,
			{
				new: true,
			},
		);
		if (!newSubCategory) {
			throw new AppError('SubCategory not found', 404);
		}

		return newSubCategory;
	}

	async deleteSubCategory(id: string) {
		const deletedSubCategory = await SubCategory.findByIdAndDelete(id);
		const category = await Category.findById(deletedSubCategory?.category);

		if (category) {
			category.subCategories = (
				category.subCategories as mongoose.Types.ObjectId[]
			).filter(
				(subCategoryId: mongoose.Types.ObjectId) =>
					subCategoryId.toString() !== id,
			);
			await category.save();
		}

		if (!deletedSubCategory) {
			throw new AppError('SubCategory not found', 404);
		}
	}
}

export default new SubCategoryService();