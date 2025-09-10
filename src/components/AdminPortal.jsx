import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload, Mail, Eye, Search, Filter, Download } from 'lucide-react';

const AdminPortal = () => {
  const [currentUser, setCurrentUser] = useState({ role: 'super_admin', username: 'admin1' });
  const [activeTab, setActiveTab] = useState('products');
  
  // Product Management State
  const [products, setProducts] = useState([
    {
      id: 1,
      title: 'Industrial Widget A',
      image: '/api/placeholder/300/200',
      specs: 'Dimensions: 10x5x3cm, Weight: 2kg',
      priceRange: '$100 - $500',
      partner: 'Partner A',
      brochure: 'widget-a-brochure.pdf',
      specSheet: 'widget-a-specs.pdf',
      status: 'active'
    },
    {
      id: 2,
      title: 'Advanced Controller B',
      image: '/api/placeholder/300/200',
      specs: 'Input: 220V, Output: 24V DC',
      priceRange: '$200 - $800',
      partner: 'Partner B',
      brochure: 'controller-b-brochure.pdf',
      specSheet: 'controller-b-specs.pdf',
      status: 'active'
    }
  ]);

  // Quotation Requests State
  const [quotations, setQuotations] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      email: 'john@company.com',
      phone: '+1-555-0123',
      company: 'ABC Corp',
      product: 'Industrial Widget A',
      quantity: 100,
      requirements: 'Need custom color and faster delivery',
      status: 'pending',
      submittedAt: '2024-01-15T10:30:00',
      priority: 'high'
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      email: 'jane@techcorp.com',
      phone: '+1-555-0456',
      company: 'TechCorp Ltd',
      product: 'Advanced Controller B',
      quantity: 50,
      requirements: 'Bulk order for Q2 project',
      status: 'responded',
      submittedAt: '2024-01-14T14:20:00',
      priority: 'medium'
    }
  ]);

  // Admin Management State
  const [admins, setAdmins] = useState([
    { id: 1, username: 'admin1', role: 'super_admin', email: 'admin1@company.com', status: 'active' },
    { id: 2, username: 'partner1', role: 'partner_admin', email: 'partner1@company.com', status: 'active', partner: 'Partner A' }
  ]);

  // Form States
  const [showProductForm, setShowProductForm] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [emailContent, setEmailContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Product Form State
  const [productForm, setProductForm] = useState({
    title: '',
    image: '',
    specs: '',
    priceRange: '',
    partner: '',
    brochure: '',
    specSheet: '',
    status: 'active'
  });

  // Admin Form State
  const [adminForm, setAdminForm] = useState({
    username: '',
    password: '',
    role: 'partner_admin',
    email: '',
    partner: ''
  });

  // Bulk Upload State
  const [bulkUploadFile, setBulkUploadFile] = useState(null);
  const [showBulkUpload, setShowBulkUpload] = useState(false);

  // Product Management Functions
  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...productForm, id: editingProduct.id } : p));
      setEditingProduct(null);
    } else {
      setProducts([...products, { ...productForm, id: products.length + 1 }]);
    }
    setProductForm({
      title: '',
      image: '',
      specs: '',
      priceRange: '',
      partner: '',
      brochure: '',
      specSheet: '',
      status: 'active'
    });
    setShowProductForm(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // Admin Management Functions
  const handleAdminSubmit = (e) => {
    e.preventDefault();
    if (editingAdmin) {
      setAdmins(admins.map(a => a.id === editingAdmin.id ? { ...adminForm, id: editingAdmin.id } : a));
      setEditingAdmin(null);
    } else {
      setAdmins([...admins, { ...adminForm, id: admins.length + 1, status: 'active' }]);
    }
    setAdminForm({
      username: '',
      password: '',
      role: 'partner_admin',
      email: '',
      partner: ''
    });
    setShowAdminForm(false);
  };

  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin);
    setAdminForm({ ...admin, password: '' });
    setShowAdminForm(true);
  };

  const handleDeleteAdmin = (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      setAdmins(admins.filter(a => a.id !== id));
    }
  };

  // Quotation Functions
  const handleQuotationStatusChange = (id, status) => {
    setQuotations(quotations.map(q => q.id === id ? { ...q, status } : q));
  };

  const handleSendQuoteEmail = () => {
    if (selectedQuotation && emailContent) {
      alert(`Email sent to ${selectedQuotation.customerName} (${selectedQuotation.email})`);
      handleQuotationStatusChange(selectedQuotation.id, 'responded');
      setSelectedQuotation(null);
      setEmailContent('');
    }
  };

  // Bulk Upload Functions
  const handleBulkUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBulkUploadFile(file);
      // In a real app, you would process the CSV/XLSX file here
      alert(`File "${file.name}" uploaded successfully. Processing...`);
    }
  };

  const processBulkUpload = () => {
    if (bulkUploadFile) {
      // Simulated bulk processing
      alert('Bulk upload processed successfully!');
      setBulkUploadFile(null);
      setShowBulkUpload(false);
    }
  };

  // Filter Functions
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.partner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    const hasPermission = currentUser.role === 'super_admin' || product.partner === currentUser.partner;
    return matchesSearch && matchesStatus && hasPermission;
  });

  const filteredQuotations = quotations.filter(quotation => {
    const matchesSearch = quotation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quotation.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || quotation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Render Functions
  const renderProductForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </h3>
        <form onSubmit={handleProductSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={productForm.title}
              onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="text"
              value={productForm.image}
              onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Specifications</label>
            <textarea
              value={productForm.specs}
              onChange={(e) => setProductForm({ ...productForm, specs: e.target.value })}
              className="w-full border rounded px-3 py-2"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price Range</label>
            <input
              type="text"
              value={productForm.priceRange}
              onChange={(e) => setProductForm({ ...productForm, priceRange: e.target.value })}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g., $100 - $500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Partner</label>
            <input
              type="text"
              value={productForm.partner}
              onChange={(e) => setProductForm({ ...productForm, partner: e.target.value })}
              className="w-full border rounded px-3 py-2"
              disabled={currentUser.role === 'partner_admin'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Brochure (PDF)</label>
            <input
              type="text"
              value={productForm.brochure}
              onChange={(e) => setProductForm({ ...productForm, brochure: e.target.value })}
              className="w-full border rounded px-3 py-2"
              placeholder="brochure.pdf"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Spec Sheet (PDF)</label>
            <input
              type="text"
              value={productForm.specSheet}
              onChange={(e) => setProductForm({ ...productForm, specSheet: e.target.value })}
              className="w-full border rounded px-3 py-2"
              placeholder="specs.pdf"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={productForm.status}
              onChange={(e) => setProductForm({ ...productForm, status: e.target.value })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setShowProductForm(false);
                setEditingProduct(null);
              }}
              className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editingProduct ? 'Update' : 'Add'} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderAdminForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {editingAdmin ? 'Edit Admin' : 'Add New Admin'}
        </h3>
        <form onSubmit={handleAdminSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={adminForm.username}
              onChange={(e) => setAdminForm({ ...adminForm, username: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={adminForm.password}
              onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required={!editingAdmin}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={adminForm.email}
              onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={adminForm.role}
              onChange={(e) => setAdminForm({ ...adminForm, role: e.target.value })}
              className="w-full border rounded px-3 py-2"
              disabled={currentUser.role !== 'super_admin'}
            >
              <option value="super_admin">Super Admin</option>
              <option value="partner_admin">Partner Admin</option>
            </select>
          </div>
          {adminForm.role === 'partner_admin' && (
            <div>
              <label className="block text-sm font-medium mb-1">Partner</label>
              <input
                type="text"
                value={adminForm.partner}
                onChange={(e) => setAdminForm({ ...adminForm, partner: e.target.value })}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setShowAdminForm(false);
                setEditingAdmin(null);
              }}
              className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editingAdmin ? 'Update' : 'Add'} Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderBulkUpload = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Bulk Upload Products</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Upload CSV/XLSX File</label>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleBulkUpload}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="text-sm text-gray-600">
            <p>Expected columns: Title, Image URL, Specs, Price Range, Partner, Brochure, Spec Sheet</p>
          </div>
          {bulkUploadFile && (
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <p className="text-green-800">File ready: {bulkUploadFile.name}</p>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowBulkUpload(false)}
              className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={processBulkUpload}
              disabled={!bulkUploadFile}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              Process Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-800">Admin Portal</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {currentUser.username} ({currentUser.role.replace('_', ' ')})
              </span>
              <button className="text-blue-600 hover:text-blue-800">Logout</button>
            </div>
          </div>
          
          <div className="flex space-x-6 border-b">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-2 px-4 font-medium ${activeTab === 'products' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('quotations')}
              className={`py-2 px-4 font-medium ${activeTab === 'quotations' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            >
              Quotations
            </button>
            {currentUser.role === 'super_admin' && (
              <button
                onClick={() => setActiveTab('admins')}
                className={`py-2 px-4 font-medium ${activeTab === 'admins' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
              >
                Admins
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Product Management</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowBulkUpload(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  <Upload className="w-4 h-4" />
                  <span>Bulk Upload</span>
                </button>
                <button
                  onClick={() => setShowProductForm(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Range</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                            <div className="text-sm text-gray-500">{product.specs}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.partner}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.priceRange}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'quotations' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Quotation Requests</h2>
            </div>

            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search quotations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="responded">Responded</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredQuotations.map((quotation) => (
                    <tr key={quotation.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{quotation.customerName}</div>
                        <div className="text-sm text-gray-500">{quotation.company}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quotation.product}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quotation.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          quotation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          quotation.status === 'responded' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {quotation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedQuotation(quotation)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => alert(`Full details: ${JSON.stringify(quotation, null, 2)}`)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedQuotation && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">
                    Send Quote to {selectedQuotation.customerName}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Email Content</label>
                      <textarea
                        value={emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                        placeholder="Enter email content..."
                        className="w-full border rounded px-3 py-2"
                        rows="6"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setSelectedQuotation(null)}
                        className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSendQuoteEmail}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Send Email
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'admins' && currentUser.role === 'super_admin' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Admin Management</h2>
              <button
                onClick={() => setShowAdminForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <Plus className="w-4 h-4" />
                <span>Add Admin</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {admins.map((admin) => (
                    <tr key={admin.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{admin.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{admin.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {admin.role.replace('_', ' ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {admin.partner || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          admin.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {admin.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditAdmin(admin)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAdmin(admin.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showProductForm && renderProductForm()}
      {showAdminForm && renderAdminForm()}
      {showBulkUpload && renderBulkUpload()}
    </div>
  );
};

export default AdminPortal;