const API_URL = 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('adminToken');

// Set token
const setToken = (token) => localStorage.setItem('adminToken', token);

// Remove token
const removeToken = () => localStorage.removeItem('adminToken');

// API call helper
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  
  const headers = {
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
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
};

// Product APIs
export const productAPI = {
  getAll: (params) => {
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

  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    return apiCall('/products/upload-image', {
      method: 'POST',
      body: formData,
    });
  },
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