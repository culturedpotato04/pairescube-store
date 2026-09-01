import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="group flex flex-col block">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50 mb-4">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-primary">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">₹{product.price.toLocaleString('en-IN')}</p>
        </div>
      </div>
      {product.sizes && product.sizes.length > 0 && (
        <div className="mt-2 text-xs text-gray-400">
          Sizes: {product.sizes.join(', ')}
        </div>
      )}
    </Link>
  );
}
