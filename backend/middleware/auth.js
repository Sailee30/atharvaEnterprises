import jwt from 'jsonwebtoken';
import Admin from '../models/admin.js';

// JWT Secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'atharva-enterprises-secret-key-2025';

// Authenticate JWT Token
export const authenticateToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Get admin from database
    const admin = await Admin.findById(decoded.id).select('-password');
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Admin not found.'
      });
    }

    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated. Contact super admin.'
      });
    }

    // Attach admin to request
    req.admin = admin;
    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.'
    });
  }
};

// Check if user is admin
export const isAdmin = (req, res, next) => {
  if (req.admin && (req.admin.role === 'super admin' || req.admin.role === 'partner admin')) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.'
    });
  }
};

// Authorize specific roles - more flexible version
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // Normalize role names for comparison (handle both 'super admin' and 'super_admin')
    const normalizedAdminRole = req.admin.role.replace(/ /g, '_');
    const normalizedRoles = roles.map(role => role.replace(/ /g, '_'));

    if (!normalizedRoles.includes(normalizedAdminRole)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.admin.role}' is not authorized to access this route`
      });
    }

    next();
  };
};

// Generate JWT Token
export const generateToken = (adminId) => {
  return jwt.sign({ id: adminId }, JWT_SECRET, {
    expiresIn: '30d' // Token valid for 30 days
  });
};

// Export alias for compatibility with different naming conventions
export const protect = authenticateToken;