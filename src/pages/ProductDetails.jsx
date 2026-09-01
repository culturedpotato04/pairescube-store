import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProductStore();
  const { addItem } = useCartStore();
  
  const [selectedSize, setSelectedSize] = useState('');

  const product = products.find(p => p.id === id);

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center">Loading product...</div>;
  if (!product) return <div className="min-h-[60vh] flex items-center justify-center">Product not found</div>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    
    addItem(product, selectedSize);
    toast.success('Added to cart');
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 animate-in fade-in duration-500">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        
        {/* Product Image */}
        <div className="aspect-[3/4] w-full bg-gray-50 overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image Available
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-10 px-4 sm:px-0 lg:mt-0 flex flex-col justify-center">
          <div className="mb-8 border-b border-gray-100 pb-8">
            <h1 className="text-3xl font-serif text-primary mb-2">{product.name}</h1>
            <p className="text-xl text-gray-900 tracking-wide">
              ₹{product.price.toLocaleString('en-IN')}
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Size</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border py-3 text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-200 text-gray-900 hover:border-gray-300 bg-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {product.sizes?.length === 0 && (
              <p className="text-sm text-red-500">Out of stock in all sizes.</p>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.sizes?.length === 0}
            className="w-full bg-primary border border-transparent text-white py-4 px-8 text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-8"
          >
            Add to Bag
          </button>

          {product.description && (
            <div className="pt-8 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Details</h3>
              <div className="prose prose-sm text-gray-500">
                <p>{product.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
