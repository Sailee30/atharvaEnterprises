import { PrismaClient } from '@prisma/client';
import cloudinary from '../config/cloudinary.js';

const prisma = new PrismaClient();

// Get all products with filtering
export const getProducts = async (req, res, next) => {
  try {
    const { search, status, partner, page = 1, limit = 100 } = req.query;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 100));
    const skip = (pageNum - 1) * limitNum;

    const where = {};

    if (status) where.status = status.toUpperCase();
    if (partner) where.partner = partner;

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { specs: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.product.count({ where })
    ]);

    res.json({
      success: true,
      count: total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// Get single product
export const getProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { datasheets: true }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// Create product
export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        ...req.body,
        status: req.body.status?.toUpperCase() || 'ACTIVE'
      }
    });

    res.status(201).json({
      success: true,
      data: product,
      message: 'Product created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Update product
export const updateProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        ...req.body,
        ...(req.body.status && { status: req.body.status.toUpperCase() })
      }
    });

    res.json({
      success: true,
      data: product,
      message: 'Product updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Delete product
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Delete from Cloudinary
    if (product.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(product.imagePublicId);
      } catch (err) {
        console.error('Cloudinary deletion error:', err);
      }
    }

    await prisma.product.delete({
      where: { id: req.params.id }
    });

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Upload product image
export const uploadProductImage = async (req, res, next) => {
  try {
    // Confirm route is called
    console.log('uploadProductImage route called');
    // Debug log for troubleshooting
    console.log('DEBUG uploadProductImage req.files:', req.files);
    console.log('DEBUG uploadProductImage req.body:', req.body);

    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }

    const file = req.files.image;

    if (file.size > parseInt(process.env.MAX_FILE_SIZE) || file.size > 10485760) {
      return res.status(400).json({
        success: false,
        message: 'File size exceeds 10MB limit'
      });
    }

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'atharva_products',
      use_filename: true,
      unique_filename: true
    });

    res.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id
      },
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get products by category
export const getByCategory = async (req, res, next) => {
  try {
    const { mainCategory, subCategory, subSubCategory } = req.query;

    const where = { status: 'ACTIVE' };

    if (mainCategory) where.mainCategory = mainCategory;
    if (subCategory) where.subCategory = subCategory;
    if (subSubCategory) where.subSubCategory = subSubCategory;

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// Bulk upload products
export const bulkUpload = async (req, res, next) => {
  try {
    const products = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of products'
      });
    }

    const created = await prisma.product.createMany({
      data: products.map(p => ({
        ...p,
        status: p.status?.toUpperCase() || 'ACTIVE'
      })),
      skipDuplicates: true
    });

    res.json({
      success: true,
      message: `Successfully uploaded ${created.count} products`,
      data: { count: created.count }
    });
  } catch (error) {
    next(error);
  }
};

// Export products as CSV
export const exportProductsCSV = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany();

    let csv = 'title,image,specs,priceRange,partner,mainCategory,subCategory,subSubCategory,description,specification,price,comparePrice\n';

    products.forEach(product => {
      csv += `"${product.title}","${product.image}","${product.specs || ''}","${product.priceRange || ''}","${product.partner}","${product.mainCategory || ''}","${product.subCategory || ''}","${product.subSubCategory || ''}","${product.description || ''}","${product.specification || ''}","${product.price || ''}","${product.comparePrice || ''}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=products.csv');
    res.send(csv);
  } catch (error) {
    next(error);
  }
};