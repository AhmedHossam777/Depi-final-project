import asyncWrapper from 'express-async-handler';
import categoryService from './category.service';

class CategoryController {
	createCategory = asyncWrapper(async (req, res) => {
		const { name, description } = req.body;
		const category = await categoryService.createCategory(name, description);
		res.status(201).json(category);
	});

	getCategories = asyncWrapper(async (req, res) => {
		const categories = await categoryService.getCategories();
		res.status(200).json(categories);
	});

	getCategoryById = asyncWrapper(async (req, res) => {
		const { id } = req.params;
		const category = await categoryService.getCategoryById(id);
		res.status(200).json(category);
	});

	updateCategory = asyncWrapper(async (req, res) => {
		const { id } = req.params;
		const { name, description } = req.body;
		const category = await categoryService.updateCategory(
			id,
			name,
			description,
		);
		res.status(200).json(category);
	});

	deleteCategory = asyncWrapper(async (req, res) => {
		const { id } = req.params;
		await categoryService.deleteCategory(id);
		res.status(204).end();
	});
}

export default new CategoryController();