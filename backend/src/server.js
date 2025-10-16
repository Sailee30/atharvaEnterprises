import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import admins from './routes/admins.js';
import products from './routes/products.js';
import datasheet from './routes/datasheet.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// CORS configuration - UPDATED
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://atharva-enterprises-gilt.vercel.app/',
  'http://localhost:3000',
  'http://localhost:5173'
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Move fileUpload middleware BEFORE body parsers
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10485760 }
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ROOT ROUTE - NEW (Add this BEFORE other routes)
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Atharva Enterprises API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      admins: '/api/admins',
      products: '/api/products',
      datasheets: '/api/datasheets'
    },
    documentation: 'https://atharva-enterprises-gules.vercel.app',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    database: 'connected',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/admins', admins);
app.use('/api/products', products);
app.use('/api/datasheets', datasheet);

// 404 handler (keep this AFTER all routes)
app.use(notFoundHandler);

// Error handling middleware (keep this last)
app.use(errorHandler);

// Graceful shutdown
const shutdownGracefully = async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
};

process.on('SIGINT', shutdownGracefully);
process.on('SIGTERM', shutdownGracefully);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📡 API URL: http://localhost:${PORT}/api`);
  console.log(`🌐 Frontend: ${allowedOrigins.join(', ')}`);
  console.log(`💾 Database: ${process.env.DATABASE_URL?.split('/').pop()?.split('?')[0]}`);
});

export default app;
