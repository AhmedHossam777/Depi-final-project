import { Router } from 'express';
import subCategoryController from './subCategory.controller';

const router = Router();

router.get('/', subCategoryController.getSubCategories);
router.get('/:id', subCategoryController.getSubCategory);
router.post('/', subCategoryController.createSubCategory);
router.patch('/:id', subCategoryController.updateSubCategory);
router.delete('/:id', subCategoryController.deleteSubCategory);

export default router;