import { Router } from 'express';
import categoryController from './category.controller';

const categoryRouter = Router();

categoryRouter.post('/', categoryController.createCategory);
categoryRouter.get('/', categoryController.getCategories);
categoryRouter.get('/:id', categoryController.getCategoryById);
categoryRouter.put('/:id', categoryController.updateCategory);
categoryRouter.delete('/:id', categoryController.deleteCategory);

export default categoryRouter;