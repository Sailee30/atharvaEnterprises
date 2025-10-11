import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  imagePublicId: String,
  specs: {
    type: String,
    trim: true
  },
  priceRange: {
    type: String,
    trim: true
  },
  partner: {
    type: String,
    required: true,
    trim: true
  },
  brochure: String,
  specSheet: String,
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  mainCategory: String,
  subCategory: String,
  subSubCategory: String,
  description: String,
  specification: String,
  price: String,
  comparePrice: String
}, {
  timestamps: true
});

productSchema.index({ title: 'text', specs: 'text', partner: 'text' });

export default mongoose.model('Product', productSchema);