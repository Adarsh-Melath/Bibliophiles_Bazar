import api from './axios';

export const addressApi = {
  // Get all addresses for the current user
  getAddresses: async () => {
    const response = await api.get('/user/addresses');
    return response.data;
  },

  // Add a new address
  addAddress: async (addressData) => {
    const response = await api.post('/user/addresses', addressData);
    return response.data;
  },

  // Update an existing address
  updateAddress: async (id, addressData) => {
    const response = await api.put(`/user/addresses/${id}`, addressData);
    return response.data;
  },

  // Delete an address
  deleteAddress: async (id) => {
    const response = await api.delete(`/user/addresses/${id}`);
    return response.data;
  }
};
