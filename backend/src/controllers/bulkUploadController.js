import Product from '../models/Product.js';
import csvParser from 'csv-parser';
import { Readable } from 'stream';

export const bulkUploadCSV = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a CSV file'
      });
    }

    const file = req.files.file;
    const products = [];

    const stream = Readable.from(file.data.toString());
    
    stream
      .pipe(csvParser())
      .on('data', (row) => {
        products.push({
          title: row.title || row.Title,
          image: row.image || row.Image,
          specs: row.specs || row.Specs,
          priceRange: row.priceRange || row['Price Range'],
          partner: row.partner || row.Partner,
          mainCategory: row.mainCategory || row['Main Category'],
          subCategory: row.subCategory || row['Sub Category'],
          subSubCategory: row.subSubCategory || row['Sub Sub Category'],
          description: row.description || row.Description,
          specification: row.specification || row.Specification
        });
      })
      .on('end', async () => {
        try {
          const result = await Product.insertMany(products, { ordered: false });
          res.json({
            success: true,
            message: `Successfully uploaded ${result.length} products`,
            data: result
          });
        } catch (error) {
          res.status(400).json({
            success: false,
            message: 'Error inserting products',
            error: error.message
          });
        }
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing CSV',
      error: error.message
    });
  }
};

export const bulkUploadJSON = async (req, res) => {
  try {
    const products = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of products'
      });
    }

    const result = await Product.insertMany(products, { ordered: false });

    res.json({
      success: true,
      message: `Successfully uploaded ${result.length} products`,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error uploading products',
      error: error.message
    });
  }
};

export const downloadCSVTemplate = (req, res) => {
  const csvTemplate = `title,image,specs,priceRange,partner,mainCategory,subCategory,subSubCategory,description,specification
Example Product,https://example.com/image.jpg,10x10x10cm,"$100-$500",Partner A,Industrial,Tools,Power Tools,Product description,Technical specs`;

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=product-template.csv');
  res.send(csvTemplate);
};

export const exportProductsCSV = async (req, res) => {
  try {
    const products = await Product.find();

    let csv = 'title,image,specs,priceRange,partner,mainCategory,subCategory,subSubCategory,description,specification\n';

    products.forEach(product => {
      csv += `"${product.title}","${product.image}","${product.specs}","${product.priceRange}","${product.partner}","${product.mainCategory}","${product.subCategory}","${product.subSubCategory}","${product.description}","${product.specification}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=products.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error exporting products',
      error: error.message
    });
  }
};