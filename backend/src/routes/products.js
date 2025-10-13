import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  getByCategory,
  bulkUpload,
  exportProductsCSV
} from '../controllers/productController.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/category', getByCategory);
router.get('/:id', getProduct);

// Protected routes
router.use(authenticateToken);

router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/upload/image', uploadProductImage);
router.post('/bulk/upload', bulkUpload);
router.get('/export/csv', exportProductsCSV);

export default router;