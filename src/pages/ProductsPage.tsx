import React, { useEffect, useState } from 'react';
import productService from '../services/productService';
import { Product } from '../types';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getAll().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded shadow p-4">
            <img src={product.imageUrl || '/placeholder.png'} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <div className="mt-2 font-bold text-blue-600">${product.price}</div>
            <div className="text-sm text-gray-500">Available: {product.availableQuantity}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage; 