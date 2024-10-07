import subCategoryService from './subCategory.service';
import asyncWrapper from 'express-async-handler';
import { Request, Response } from 'express';

class SubCategoryController {
	getSubCategories = asyncWrapper(async (req: Request, res: Response) => {
		const subCategories = await subCategoryService.getSubCategories();
		res.status(200).json(subCategories);
	});

	getSubCategory = asyncWrapper(async (req: Request, res: Response) => {
		const subCategory = await subCategoryService.getSubCategoryById(
			req.params.id
		);
		res.status(200).json(subCategory);
	});

	createSubCategory = asyncWrapper(async (req: Request, res: Response) => {
		const subCategory = await subCategoryService.createSubCategory(req.body);
		res.status(201).status(201).json(subCategory);
	});

	updateSubCategory = asyncWrapper(async (req: Request, res: Response) => {
		const subCategory = await subCategoryService.updateSubCategory(
			req.params.id,
			req.body
		);
		res.status(200).json(subCategory);
	});

	deleteSubCategory = asyncWrapper(async (req: Request, res: Response) => {
		await subCategoryService.deleteSubCategory(req.params.id);
		res.status(200).json({ message: 'SubCategory Deleted Successfully' });
	});
}

export default new SubCategoryController();
