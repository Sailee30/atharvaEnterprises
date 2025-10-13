export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Prisma validation errors
  if (err.code === 'P2002') {
    const field = err.meta?.target?.[0] || 'field';
    return res.status(400).json({
      success: false,
      message: `${field} already exists`
    });
  }

  // Prisma not found error
  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'Record not found'
    });
  }

  // Prisma validation error
  if (err.code === 'P2003') {
    return res.status(400).json({
      success: false,
      message: 'Invalid reference'
    });
  }

  // Generic error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
};