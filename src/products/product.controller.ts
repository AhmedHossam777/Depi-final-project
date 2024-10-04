import { productService } from './product.service';
import { Request, Response } from 'express';
import asyncWrapper from 'express-async-handler';

class ProductController {
	createProduct = asyncWrapper(async (req: Request, res: Response) => {
		const product = await productService.createProduct(req.body);
		res.status(201).json(product);
	});

	getAllProducts = asyncWrapper(async (req: Request, res: Response) => {
		const products = await productService.getAllProducts();
		res.status(200).json(products);
	});

	getProduct = asyncWrapper(async (req: Request, res: Response) => {
		const product = await productService.getProduct(req.params.id);
		res.status(200).json(product);
	});

	updateProduct = asyncWrapper(async (req: Request, res: Response) => {
		const product = await productService.updateProduct(req.params.id, req.body);
		res.status(200).json(product);
	});

	deleteProduct = asyncWrapper(async (req: Request, res: Response) => {
		await productService.deleteProduct(req.params.id);
		res.status(204).send();
	});
}

export const productController = new ProductController();