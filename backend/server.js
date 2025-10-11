import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from 'express-fileupload';

// Import routes
import productsRouter from './routes/products.js';
import adminsRouter from './routes/admins.js';

// Import error handler
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

app.use('/api/products', productsRouter);
app.use('/api/admins', adminsRouter);

// Error handling middleware
app.use(errorHandler);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    console.log(` Database: ${mongoose.connection.db.databaseName}`);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` API: http://localhost:${PORT}/api`);
  console.log(` Products: http://localhost:${PORT}/api/products`);
  console.log(` Admins: http://localhost:${PORT}/api/admins`);
});