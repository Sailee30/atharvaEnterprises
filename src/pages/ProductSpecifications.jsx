import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductSpecifications = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Loading product data...');
        console.log('Product ID from params:', productId);
        
        // Import the JSON data
        const data = await import('../components/Products.json');
        const products = data.default || data;
        
        console.log('Products loaded:', products.length, 'items');
        console.log('First product:', products[0]);
        
        setProductsData(products);
        
        // Find the product by ID
        const foundProduct = products.find(p => p.id === parseInt(productId));
        console.log('Found product:', foundProduct);
        
        if (!foundProduct) {
          setError(`Product with ID ${productId} not found`);
          setProduct(null);
        } else {
          // Transform the product data
          const transformedProduct = {
            ...foundProduct,
            specifications: parseSpecifications(foundProduct.specification || ''),
            features: generateFeatures(foundProduct),
            applications: generateApplications(foundProduct.mainCategory || ''),
            brand: foundProduct.brand || 'Professional Grade'
          };
          
          console.log('Transformed product:', transformedProduct);
          setProduct(transformedProduct);
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError(`Failed to load product data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadData();
    } else {
      setError('No product ID provided');
      setLoading(false);
    }
  }, [productId]);

  // Helper function to parse specifications string into key-value pairs
  const parseSpecifications = (specString) => {
    if (!specString) return {};
    
    const specs = {};
    
    try {
      // Parse different specification patterns
      const patterns = [
        { regex: /(\d+(?:–\d+)?(?:\.\d+)?)\s*W(?:\s|$)/, key: 'Power Rating', unit: 'W' },
        { regex: /(\d+(?:–\d+)?(?:\.\d+)?)\s*L(?:\s|$|\/min)/, key: 'Tank Capacity', unit: 'L' },
        { regex: /(\d+(?:–\d+)?)\s*dB/, key: 'Noise Level', unit: 'dB' },
        { regex: /(\d+(?:–\d+)?(?:\.\d+)?)\s*kg/, key: 'Weight', unit: 'kg' },
        { regex: /(\d+(?:–\d+)?)\s*cm/, key: 'Working Width', unit: 'cm' },
        { regex: /(\d+(?:–\d+)?)\s*bar/, key: 'Pressure', unit: 'bar' },
        { regex: /(\d+(?:–\d+)?)\s*PSI/, key: 'Pressure', unit: 'PSI' },
        { regex: /(\d+(?:–\d+)?)\s*hrs/, key: 'Run Time', unit: 'hrs' },
        { regex: /(\d+(?:–\d+)?)\s*V/, key: 'Voltage', unit: 'V' },
        { regex: /(\d+(?:–\d+)?)\s*HP/, key: 'Engine Power', unit: 'HP' }
      ];

      patterns.forEach(({ regex, key, unit }) => {
        const match = specString.match(regex);
        if (match) {
          specs[key] = `${match[1]} ${unit}`;
        }
      });

      // Extract dimensions if present
      const dimensionMatch = specString.match(/(\d+(?:\.\d+)?)\s*x\s*(\d+(?:\.\d+)?)\s*x\s*(\d+(?:\.\d+)?)\s*cm/);
      if (dimensionMatch) {
        specs['Dimensions'] = `${dimensionMatch[1]} x ${dimensionMatch[2]} x ${dimensionMatch[3]} cm`;
      }

      // If no specific specs found, create basic one
      if (Object.keys(specs).length === 0) {
        specs['Specifications'] = specString;
      }
    } catch (err) {
      console.error('Error parsing specifications:', err);
      specs['Specifications'] = specString;
    }

    return specs;
  };

  // Helper function to generate features based on product data
  const generateFeatures = (product) => {
    const features = [];
    
    try {
      const description = (product.description || '').toLowerCase();
      const specification = (product.specification || '').toLowerCase();
      
      // Extract features from description
      const featureKeywords = [
        { keyword: 'hepa', feature: 'HEPA Filtration System' },
        { keyword: 'portable', feature: 'Portable Design' },
        { keyword: 'durable', feature: 'Durable Construction' },
        { keyword: 'compact', feature: 'Compact Design' },
        { keyword: 'lightweight', feature: 'Lightweight' },
        { keyword: 'heavy-duty', feature: 'Heavy-Duty Performance' },
        { keyword: 'electric', feature: 'Electric Powered' },
        { keyword: 'battery', feature: 'Battery Operated' },
        { keyword: 'wireless', feature: 'Cordless Operation' },
        { keyword: 'high pressure', feature: 'High Pressure System' },
        { keyword: 'cold-water', feature: 'Cold Water Operation' },
        { keyword: 'hot-water', feature: 'Hot Water Capability' },
        { keyword: 'robotic', feature: 'Automated Operation' },
        { keyword: 'commercial', feature: 'Commercial Grade' },
        { keyword: 'industrial', feature: 'Industrial Strength' }
      ];

      featureKeywords.forEach(({ keyword, feature }) => {
        if (description.includes(keyword) || specification.includes(keyword)) {
          features.push(feature);
        }
      });

      // Add category-specific features
      const categoryFeatures = {
        'Vacuum Cleaner': ['High Suction Power', 'Easy Maintenance', 'Multi-Surface Cleaning'],
        'Pressure Washer': ['Adjustable Pressure', 'Quick Connect Fittings', 'Heavy-Duty Pump'],
        'Floor Care': ['Professional Results', 'Time Saving', 'Ergonomic Design'],
        'Robotic': ['Smart Navigation', 'Automated Scheduling', 'Remote Monitoring']
      };

      const subCategory = product.subCategory || '';
      if (categoryFeatures[subCategory]) {
        features.push(...categoryFeatures[subCategory]);
      }

      // Ensure we have at least some features
      if (features.length === 0) {
        features.push('Professional Grade', 'Reliable Performance', 'Easy Operation', 'Quality Construction');
      }

      // Remove duplicates and limit to 6 features
      return [...new Set(features)].slice(0, 6);
    } catch (err) {
      console.error('Error generating features:', err);
      return ['Professional Grade', 'Reliable Performance', 'Easy Operation'];
    }
  };

  // Helper function to generate applications based on main category
  const generateApplications = (mainCategory) => {
    try {
      const applicationMap = {
        'Industrial Cleaning Solutions': [
          'Commercial Facilities',
          'Industrial Plants',
          'Warehouses',
          'Manufacturing Facilities',
          'Office Buildings',
          'Retail Stores'
        ],
        'Floor Care Solutions': [
          'Commercial Floors',
          'Industrial Surfaces',
          'Healthcare Facilities',
          'Educational Institutions'
        ],
        'Pressure Washing': [
          'Vehicle Cleaning',
          'Building Maintenance',
          'Equipment Cleaning',
          'Surface Preparation'
        ]
      };
      
      return applicationMap[mainCategory] || [
        'Professional Use',
        'Commercial Applications',
        'Industrial Operations',
        'Maintenance Tasks'
      ];
    } catch (err) {
      console.error('Error generating applications:', err);
      return ['Professional Use', 'Commercial Applications'];
    }
  };

  console.log('Current state:', { loading, error, product, productId });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p>Loading product {productId}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Error</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <p className="text-sm text-gray-500 mb-6">Product ID: {productId}</p>
        <p className="text-sm text-gray-500 mb-6">Available products: {productsData.length}</p>
        <button 
          onClick={() => navigate('/products')}
          className="px-6 py-3 bg-yellow-400 text-gray-900 font-medium rounded-md hover:bg-yellow-500 transition-colors"
        >
          Back to Products
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">Product ID {productId} was not found in our catalog.</p>
        <button 
          onClick={() => navigate('/products')}
          className="px-6 py-3 bg-yellow-400 text-gray-900 font-medium rounded-md hover:bg-yellow-500 transition-colors"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Debug Info - Remove this in production */}
        <div className="mb-4 p-2 bg-yellow-100 rounded text-xs">
          Debug: Product ID = {productId}, Product Name = {product.name}
        </div>

        {/* Back Button */}
        <button 
          onClick={() => navigate('/products')}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </button>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8">
              <div className="flex flex-col md:flex-row justify-between items-start">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-block px-3 py-1 bg-yellow-400 text-gray-900 text-sm font-medium rounded">
                      {product.mainCategory || 'Category'}
                    </span>
                    <span className="inline-block px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded">
                      {product.subCategory || 'Subcategory'}
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold mb-2">{product.name || 'Product Name'}</h1>
                  <p className="text-gray-300 text-lg leading-relaxed">{product.description || 'No description available'}</p>
                </div>
                <div className="mt-4 md:mt-0 md:ml-8">
                  <div className="text-right">
                    {product.brand && (
                      <div className="text-gray-300 text-lg font-semibold">{product.brand}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Product Image */}
              <div className="mb-8">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log('Image failed to load:', product.image);
                        e.target.style.display = 'none';
                        const placeholder = document.createElement('div');
                        placeholder.className = 'w-full h-full flex items-center justify-center text-gray-500';
                        placeholder.innerHTML = `
                          <div class="text-center">
                            <svg class="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p>Image not available</p>
                            <p class="text-xs mt-1">Path: ${product.image}</p>
                          </div>
                        `;
                        e.target.parentElement.appendChild(placeholder);
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p>No Image Available</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Specifications Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Technical Specifications */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">Technical Specifications</h2>
                  <div className="space-y-3">
                    {product.specifications && Object.keys(product.specifications).length > 0 ? (
                      Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b border-gray-200 pb-2">
                          <span className="font-medium text-gray-700">{key}:</span>
                          <span className="text-gray-600">{value}</span>
                        </div>
                      ))
                    ) : (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-600">{product.specification || 'No specifications available'}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">Key Features</h2>
                  <ul className="space-y-2">
                    {product.features && product.features.length > 0 ? (
                      product.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">No features available</li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Applications */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Applications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {product.applications && product.applications.length > 0 ? (
                    product.applications.map((application, index) => (
                      <div key={index} className="bg-blue-50 rounded-lg p-4 text-center border border-blue-100">
                        <span className="text-gray-700 font-medium">{application}</span>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-gray-500 text-center">No applications available</div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
                <button className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-md hover:bg-yellow-500 transition-colors shadow-md">
                  Download Brochure
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 transition-colors">
                  Request Quote
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecifications;