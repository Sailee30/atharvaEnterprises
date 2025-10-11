import mongoose from 'mongoose';

const datasheetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true
  },
  company: {
    type: String,
    trim: true,
    default: ''
  },
  message: {
    type: String,
    trim: true,
    default: ''
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    productName: String,
    quantity: {
      type: Number,
      default: 1
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'processing', 'sent', 'completed'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for faster queries
datasheetSchema.index({ email: 1, createdAt: -1 });
datasheetSchema.index({ status: 1, priority: -1 });

const Datasheet = mongoose.model('Datasheet', datasheetSchema);

export default Datasheet;