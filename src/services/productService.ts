import api from './api';
import { Product } from '../types';

const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
  },
  
  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  
  searchProductsByName: async (name: string): Promise<Product[]> => {
    const response = await api.get(`/products/search?name=${name}`);
    return response.data;
  },
  
  searchProductsByPriceRange: async (minPrice: number, maxPrice: number): Promise<Product[]> => {
    const response = await api.get(`/products/search?minPrice=${minPrice}&maxPrice=${maxPrice}`);
    return response.data;
  },
  
  getProductsByFarmer: async (farmerId: number): Promise<Product[]> => {
    const response = await api.get(`/products/farmer/${farmerId}`);
    return response.data;
  },
  
  createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await api.post('/products', product);
    return response.data;
  },
  
  updateProduct: async (id: number, product: Partial<Product>): Promise<Product> => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
  },
  
  deleteProduct: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
  
  uploadProductImage: async (id: number, file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(`/products/${id}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.imageUrl;
  },
};

export default productService;