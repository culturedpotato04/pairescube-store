import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProductStore();
  const { addItem } = useCartStore();
  
  const [selectedSize, setSelectedSize] = useState('');

  const product = products.find(p => p.id === id);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xs tracking-widest uppercase">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center text-xs tracking-widest uppercase">Not found</div>;

  const handleAddToCart = () => {
    if (!selectedSize) return alert('Select a size');
    addItem(product, selectedSize);
    navigate('/cart');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-24">
      <Link to="/" className="text-xs uppercase tracking-widest text-gray-400 hover:text-black mb-12 block">
        &larr; Back
      </Link>
      <div className="grid md:grid-cols-2 gap-12 md:gap-24">
        
        <div className="aspect-[3/4] bg-gray-50">
          {product.image_url && (
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          )}
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-xl uppercase tracking-widest mb-2">{product.name}</h1>
          <p className="text-sm text-gray-500 mb-12">₹{product.price}</p>
          
          <div className="mb-12">
            <p className="text-xs uppercase tracking-widest mb-4">Select Size</p>
            <div className="flex gap-4 flex-wrap">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 border text-xs transition-colors ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
