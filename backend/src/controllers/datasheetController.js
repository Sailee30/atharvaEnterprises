import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create datasheet request
export const createDatasheet = async (req, res, next) => {
  try {
    const { name, email, phone, company, message, products } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone are required'
      });
    }

    const datasheet = await prisma.datasheet.create({
      data: {
        name,
        email,
        phone,
        company: company || null,
        message: message || null,
        status: 'PENDING',
        products: {
          create: products?.map(p => ({
            productId: p.productId,
            productName: p.productName,
            quantity: p.quantity || 1
          })) || []
        }
      },
      include: { products: { include: { product: true } } }
    });

    res.status(201).json({
      success: true,
      data: datasheet,
      message: 'Datasheet request created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get all datasheets
export const getDatasheets = async (req, res, next) => {
  try {
    const { status, priority, page = 1, limit = 50 } = req.query;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 50));
    const skip = (pageNum - 1) * limitNum;

    const where = {};
    if (status) where.status = status.toUpperCase();
    if (priority) where.priority = priority.toUpperCase();

    const [datasheets, total] = await Promise.all([
      prisma.datasheet.findMany({
        where,
        skip,
        take: limitNum,
        include: { products: { include: { product: true } } },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.datasheet.count({ where })
    ]);

    res.json({
      success: true,
      count: total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: datasheets
    });
  } catch (error) {
    next(error);
  }
};

// Get single datasheet
export const getDatasheet = async (req, res, next) => {
  try {
    const datasheet = await prisma.datasheet.findUnique({
      where: { id: req.params.id },
      include: { products: { include: { product: true } } }
    });

    if (!datasheet) {
      return res.status(404).json({
        success: false,
        message: 'Datasheet not found'
      });
    }

    res.json({
      success: true,
      data: datasheet
    });
  } catch (error) {
    next(error);
  }
};

// Update datasheet
export const updateDatasheet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { products, ...updateData } = req.body;

    const datasheet = await prisma.datasheet.update({
      where: { id },
      data: {
        ...updateData,
        ...(updateData.status && { status: updateData.status.toUpperCase() }),
        ...(updateData.priority && { priority: updateData.priority.toUpperCase() })
      },
      include: { products: { include: { product: true } } }
    });

    res.json({
      success: true,
      data: datasheet,
      message: 'Datasheet updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Delete datasheet
export const deleteDatasheet = async (req, res, next) => {
  try {
    await prisma.datasheet.delete({
      where: { id: req.params.id }
    });

    res.json({
      success: true,
      message: 'Datasheet deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Update datasheet status
export const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['PENDING', 'PROCESSING', 'SENT', 'COMPLETED'].includes(status.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const datasheet = await prisma.datasheet.update({
      where: { id },
      data: { status: status.toUpperCase() },
      include: { products: { include: { product: true } } }
    });

    res.json({
      success: true,
      data: datasheet,
      message: 'Status updated successfully'
    });
  } catch (error) {
    next(error);
  }
};