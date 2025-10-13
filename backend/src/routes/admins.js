import express from 'express';
import { authenticateToken, authorize } from '../middleware/auth.js';
import {
  loginAdmin,
  getAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getProfile
} from '../controllers/adminController.js';

const router = express.Router();

// Public routes
router.post('/login', loginAdmin);

// Protected routes
router.use(authenticateToken);

router.get('/me', getProfile);
router.get('/', authorize('SUPER_ADMIN'), getAdmins);
router.get('/:id', authorize('SUPER_ADMIN'), getAdmin);
router.post('/', authorize('SUPER_ADMIN'), createAdmin);
router.put('/:id', authorize('SUPER_ADMIN'), updateAdmin);
router.delete('/:id', authorize('SUPER_ADMIN'), deleteAdmin);

export default router;