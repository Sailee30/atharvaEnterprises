import express from 'express';
import {
  loginAdmin,
  getAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin
} from '../controllers/adminController.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.post('/login', loginAdmin);

// Protected routes
router.use(authenticateToken);
router.get('/me', (req, res) => {
  res.json({
    success: true,
    data: req.admin
  });
});

// Super admin only routes
router.get('/', isAdmin, getAdmins);
router.get('/:id', isAdmin, getAdmin);
router.post('/', isAdmin, createAdmin);
router.put('/:id', isAdmin, updateAdmin);
router.delete('/:id', isAdmin, deleteAdmin);

export default router;