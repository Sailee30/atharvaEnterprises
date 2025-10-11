import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';
import Admin from '../models/admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('🚀 Starting Atharva Enterprises Migration...\n');

/**
 * Connect to MongoDB
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully');
    console.log(`📦 Database: ${mongoose.connection.name}\n`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check your .env file has correct MONGODB_URI');
    console.error('   2. Verify username and password');
    console.error('   3. Ensure IP 0.0.0.0/0 is whitelisted in Atlas');
    process.exit(1);
  }
};

/**
 * Create default super admin
 */
const createDefaultAdmin = async () => {
  try {
    console.log('👤 Creating Default Admin...');

    const existingAdmin = await Admin.findOne({ username: 'admin1' });

    if (existingAdmin) {
      console.log('   ℹ️  Admin "admin1" already exists');
      console.log('   Username: admin1');
      console.log('   Role: super_admin\n');
      return existingAdmin;
    }

    const admin = await Admin.create({
      username: 'admin1',
      email: 'admin1@atharvaenterprises.com',
      password: 'admin123',
      role: 'super_admin',
      status: 'active'
    });

    console.log('✅ Default Super Admin Created!');
    console.log('   Username: admin1');
    console.log('   Password: admin123');
    console.log('   Email: admin1@atharvaenterprises.com');
    console.log('   Role: super_admin');
    console.log('   ⚠️  IMPORTANT: Change password after first login!\n');

    return admin;
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    throw error;
  }
};

/**
 * Create sample partner admin
 */
const createPartnerAdmin = async () => {
  try {
    console.log('👥 Creating Sample Partner Admin...');

    const existingPartner = await Admin.findOne({ username: 'partner1' });

    if (existingPartner) {
      console.log('   ℹ️  Partner admin "partner1" already exists\n');
      return existingPartner;
    }

    const partnerAdmin = await Admin.create({
      username: 'partner1',
      email: 'partner1@company.com',
      password: 'partner123',
      role: 'partner_admin',
      partner: 'Partner A',
      status: 'active'
    });

    console.log('✅ Sample Partner Admin Created!');
    console.log('   Username: partner1');
    console.log('   Password: partner123');
    console.log('   Email: partner1@company.com');
    console.log('   Role: partner_admin');
    console.log('   Partner: Partner A\n');

    return partnerAdmin;
  } catch (error) {
    console.error('⚠️  Error creating partner admin:', error.message);
    // Don't throw - partner admin is optional
  }
};

/**
 * Import products from existing Products.json
 */
const importProducts = async () => {
  try {
    console.log('📦 Importing Products from Products.json...');

    // Define possible paths
    const possiblePaths = [
      'C:/Users/MILIND/Desktop/Project1/atharvaEnterprises/src/components/Products.json',
      path.join(__dirname, '../../atharvaEnterprises/src/components/Products.json'),
      path.join(__dirname, '../Products.json'),
      path.join(process.cwd(), '../atharvaEnterprises/src/components/Products.json'),
    ];

    let productsPath = null;
    let productsData = null;

    // Find the correct path
    for (const testPath of possiblePaths) {
      if (fs.existsSync(testPath)) {
        productsPath = testPath;
        console.log(`✅ Found Products.json at: ${testPath}`);
        const fileContent = fs.readFileSync(testPath, 'utf8');
        productsData = JSON.parse(fileContent);
        break;
      }
    }

    if (!productsData || !Array.isArray(productsData) || productsData.length === 0) {
      console.log('⚠️  Products.json not found or empty!');
      console.log('   Tried paths:');
      possiblePaths.forEach(p => console.log(`   - ${p}`));
      return 0;
    }

    console.log(`   📊 Total products found: ${productsData.length}`);

    // Delete existing products
    const deletedCount = await Product.deleteMany({});
    console.log(`   🗑️  Cleared ${deletedCount.deletedCount} existing products`);

    // Transform products - Handle BOTH possible JSON structures
    const transformedProducts = productsData.map((product, index) => {
      // Get the name field (could be 'name' or 'title')
      const productName = product.name || product.title || `Product ${index + 1}`;
      
      return {
        name: productName,
        mainCategory: product.mainCategory || product.main_category || 'General',
        subCategory: product.subCategory || product.sub_category || 'Miscellaneous',
        subSubCategory: product.subSubCategory || product.sub_sub_category || '',
        price: product.price || '0.00',
        comparePrice: product.comparePrice || product.compare_price || '0.00',
        description: product.description || '',
        specification: product.specification || product.specs || '',
        image: product.image || product.imageUrl || '',
        partner: product.partner || product.brand || '',
        inStock: product.inStock !== false,
        featured: product.featured === true,
      };
    });

    // Validate first product to ensure mapping is correct
    console.log('\n   🔍 Sample product data:');
    console.log(`   Name: ${transformedProducts[0].name}`);
    console.log(`   Category: ${transformedProducts[0].mainCategory}`);
    console.log(`   SubCategory: ${transformedProducts[0].subCategory}\n`);

    // Insert in batches
    const batchSize = 50;
    let insertedCount = 0;
    let errorCount = 0;
    const errors = [];

    for (let i = 0; i < transformedProducts.length; i += batchSize) {
      const batch = transformedProducts.slice(i, i + batchSize);
      
      try {
        const inserted = await Product.insertMany(batch, { ordered: false });
        insertedCount += inserted.length;
        console.log(`   ✓ Inserted batch ${Math.floor(i/batchSize) + 1}: ${inserted.length} products`);
      } catch (error) {
        // Handle partial insertion errors
        if (error.insertedDocs) {
          insertedCount += error.insertedDocs.length;
          console.log(`   ⚠️  Batch ${Math.floor(i/batchSize) + 1}: ${error.insertedDocs.length} inserted, ${error.writeErrors?.length || 0} failed`);
        }
        
        if (error.writeErrors) {
          error.writeErrors.forEach(err => {
            errorCount++;
            errors.push({
              index: i + err.index,
              message: err.errmsg
            });
          });
        }
      }
    }

    console.log(`\n✅ Successfully imported ${insertedCount} products!`);
    
    if (errorCount > 0) {
      console.log(`⚠️  ${errorCount} products failed to import`);
      console.log('\n   First 5 errors:');
      errors.slice(0, 5).forEach(err => {
        console.log(`   - Product ${err.index}: ${err.message}`);
      });
    }
    
    console.log('');
    return insertedCount;

  } catch (error) {
    console.error('❌ Error importing products:', error.message);
    console.error(error);
    return 0;
  }
};

/**
 * Display summary
 */
const displaySummary = async () => {
  try {
    const productCount = await Product.countDocuments();
    const adminCount = await Admin.countDocuments();
    const categories = await Product.distinct('mainCategory');

    console.log('═══════════════════════════════════════════════');
    console.log('✨ MIGRATION COMPLETED SUCCESSFULLY!');
    console.log('═══════════════════════════════════════════════\n');

    console.log('📊 Summary:');
    console.log(`   Products: ${productCount}`);
    console.log(`   Admins: ${adminCount}`);
    console.log(`   Categories: ${categories.length}`);
    console.log('');

    if (categories.length > 0) {
      console.log('📂 Categories:');
      for (const cat of categories) {
        const count = await Product.countDocuments({ mainCategory: cat });
        console.log(`   - ${cat}: ${count} products`);
      }
      console.log('');
    }

    console.log('🔐 Login Credentials:');
    console.log('   Super Admin:');
    console.log('   - Username: admin1');
    console.log('   - Password: admin123');
    console.log('   - URL: http://localhost:5000/admin');
    console.log('');

    const partner = await Admin.findOne({ role: 'partner_admin' });
    if (partner) {
      console.log('   Partner Admin:');
      console.log('   - Username: partner1');
      console.log('   - Password: partner123');
      console.log('');
    }

    console.log('📋 Next Steps:');
    console.log('   1. Backend is already running ✅');
    console.log('   2. Start frontend: cd ../atharvaEnterprises && npm run dev');
    console.log('   3. Open: http://localhost:5173');
    console.log('   4. Login to admin: http://localhost:5173/admin');
    console.log('   5. ⚠️  Change default passwords!');
    console.log('');

    console.log('🔗 API Endpoints:');
    console.log('   - Health: http://localhost:5000/api/health');
    console.log('   - Products: http://localhost:5000/api/products');
    console.log('   - Login: POST http://localhost:5000/api/admins/login');
    console.log('');

  } catch (error) {
    console.error('❌ Error displaying summary:', error.message);
  }
};

/**
 * Run all migrations
 */
const runMigrations = async () => {
  try {
    await connectDB();
    await createDefaultAdmin();
    await createPartnerAdmin();
    await importProducts();
    await displaySummary();

    console.log('✅ All done! Closing database connection...\n');
    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.error(error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run migrations
runMigrations();