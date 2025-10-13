import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  createDatasheet,
  getDatasheets,
  getDatasheet,
  updateDatasheet,
  deleteDatasheet,
  updateStatus
} from '../controllers/datasheetController.js';

const router = express.Router();

// Public routes
router.post('/', createDatasheet);

// Protected routes
router.use(authenticateToken);

router.get('/', getDatasheets);
router.get('/:id', getDatasheet);
router.put('/:id', updateDatasheet);
router.delete('/:id', deleteDatasheet);
router.patch('/:id/status', updateStatus);

export default router;