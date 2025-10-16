const API_URL = import.meta.env.VITE_API_URL || 'https://atharvaenterprises-production.up.railway.app';

// Get token from localStorage - FIXED: Changed from 'adminToken' to 'token'
const getToken = () => localStorage.getItem('token');

// Set token - FIXED: Changed from 'adminToken' to 'token'
const setToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  }
};

// Remove token - FIXED: Changed from 'adminToken' to 'token'
const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('adminUser'); // Also remove user data
};

// API call helper with error handling
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();

  const headers = {
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Don't set Content-Type for FormData - browser will set it automatically
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    // Handle 401 - Token expired or invalid
    if (response.status === 401) {
      removeToken();
      window.location.href = '/admin/login'; // FIXED: Changed from '/login' to '/admin/login'
      throw new Error(data.message || 'Unauthorized. Please login again.');
    }

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth APIs
export const authAPI = {
  login: async (credentials) => {
    const data = await apiCall('/admins/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (data.token) {
      setToken(data.token);
    }
    return data;
  },

  logout: () => {
    removeToken();
  },

  getProfile: () => apiCall('/admins/me'),

  getToken: () => getToken(),

  isAuthenticated: () => !!getToken(),

  createAdmin: (adminData) => apiCall('/admins', {
    method: 'POST',
    body: JSON.stringify(adminData),
  }),

  updateAdmin: (id, adminData) => apiCall(`/admins/${id}`, {
    method: 'PUT',
    body: JSON.stringify(adminData),
  }),

  getAdmins: () => apiCall('/admins'),
};

// Product APIs
export const productAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/products${queryString ? `?${queryString}` : ''}`);
  },

  getOne: (id) => apiCall(`/products/${id}`),

  create: (productData) => apiCall('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  }),

  update: (id, productData) => apiCall(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  }),

  delete: (id) => apiCall(`/products/${id}`, {
    method: 'DELETE',
  }),

  // FIXED: Single uploadImage function that properly handles FormData
  uploadImage: (formData) => apiCall('/products/upload/image', {
    method: 'POST',
    body: formData,
    // Don't set Content-Type header - let browser handle it for FormData
  }),

  getByCategory: (params) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/products/category${queryString ? `?${queryString}` : ''}`);
  },

  bulkUpload: (products) => apiCall('/products/bulk/upload', {
    method: 'POST',
    body: JSON.stringify(products),
  }),

  exportCSV: () => apiCall('/products/export/csv'),
};

// Admin APIs
export const adminAPI = {
  getAll: () => apiCall('/admins'),

  getOne: (id) => apiCall(`/admins/${id}`),

  create: (adminData) => apiCall('/admins', {
    method: 'POST',
    body: JSON.stringify(adminData),
  }),

  update: (id, adminData) => apiCall(`/admins/${id}`, {
    method: 'PUT',
    body: JSON.stringify(adminData),
  }),

  delete: (id) => apiCall(`/admins/${id}`, {
    method: 'DELETE',
  }),
};

// Datasheet APIs
export const datasheetAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/datasheets${queryString ? `?${queryString}` : ''}`);
  },

  getOne: (id) => apiCall(`/datasheets/${id}`),

  create: (datasheetData) => apiCall('/datasheets', {
    method: 'POST',
    body: JSON.stringify(datasheetData),
  }),

  update: (id, datasheetData) => apiCall(`/datasheets/${id}`, {
    method: 'PUT',
    body: JSON.stringify(datasheetData),
  }),

  delete: (id) => apiCall(`/datasheets/${id}`, {
    method: 'DELETE',
  }),

  updateStatus: (id, status) => apiCall(`/datasheets/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  }),
};

export default {
  authAPI,
  productAPI,
  adminAPI,
  datasheetAPI,
};
