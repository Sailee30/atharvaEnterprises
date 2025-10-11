import Admin from '../models/admin.js';
import { generateToken } from '../middleware/auth.js';

// Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin and include password field
    const admin = await Admin.findOne({ username }).select('+password');
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
    const token = generateToken(admin._id);

    res.json({
      success: true,
      token,
      data: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        partner: admin.partner
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
};

// Get all admins
export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.json({
      success: true,
      count: admins.length,
      data: admins
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching admins',
      error: error.message
    });
  }
};

// Get single admin
export const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select('-password');
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.json({
      success: true,
      data: admin
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching admin',
      error: error.message
    });
  }
};

// Create admin
export const createAdmin = async (req, res) => {
  try {
    const { username, email, password, role, partner } = req.body;

    const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
    
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin with this username or email already exists'
      });
    }

    const admin = await Admin.create({
      username,
      email,
      password,
      role,
      partner: role === 'partner_admin' ? partner : undefined
    });

    res.status(201).json({
      success: true,
      data: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        partner: admin.partner
      },
      message: 'Admin created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating admin',
      error: error.message
    });
  }
};

// Update admin
export const updateAdmin = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;

    let admin = await Admin.findById(req.params.id);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    if (password) {
      admin.password = password;
      await admin.save();
    }

    admin = await Admin.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      data: admin,
      message: 'Admin updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating admin',
      error: error.message
    });
  }
};

// Delete admin
export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    await admin.deleteOne();

    res.json({
      success: true,
      message: 'Admin deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting admin',
      error: error.message
    });
  }
};