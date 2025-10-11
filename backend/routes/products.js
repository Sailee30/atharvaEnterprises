import express from 'express';
import { 
  getProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  uploadProductImage
} from '../controllers/productController.js';
import {
  bulkUploadCSV,
  bulkUploadJSON,
  downloadCSVTemplate,
  exportProductsCSV
} from '../controllers/bulkUploadController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Template and export routes (public or protected based on your needs)
router.get('/csv-template', downloadCSVTemplate);
router.get('/export-csv', protect, authorize('super_admin', 'partner_admin'), exportProductsCSV);

// Protected routes - require authentication and admin authorization
router.post('/', protect, authorize('super_admin', 'partner_admin'), createProduct);
router.put('/:id', protect, authorize('super_admin', 'partner_admin'), updateProduct);
router.delete('/:id', protect, authorize('super_admin'), deleteProduct);
router.post('/upload-image', protect, authorize('super_admin', 'partner_admin'), uploadProductImage);
router.post('/bulk-upload-csv', protect, authorize('super_admin'), bulkUploadCSV);
router.post('/bulk-upload-json', protect, authorize('super_admin'), bulkUploadJSON);

export default router;