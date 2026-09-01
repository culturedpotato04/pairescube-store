import React from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/productStore';

export default function Home() {
  const { categories, products, loading } = useProductStore();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xs tracking-widest uppercase">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-20 text-center">
        <h1 className="text-4xl font-light tracking-widest mb-4">PAIRESCUBE</h1>
        <p className="text-xs tracking-widest text-gray-400 uppercase">Minimalist Footwear</p>
      </div>

      <div className="space-y-16 text-center">
        {categories.map((cat) => {
          const catProducts = products.filter(p => p.category_id === cat.id);
          if (catProducts.length === 0) return null;
          return (
            <div key={cat.id}>
              <h2 className="text-sm font-semibold tracking-widest uppercase mb-8">{cat.name}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {catProducts.map(product => (
                  <Link key={product.id} to={`/product/${product.id}`} className="group block text-left">
                    <div className="aspect-[3/4] bg-gray-50 mb-4 overflow-hidden">
                      {product.image_url && (
                        <img 
                          src={product.image_url} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-opacity group-hover:opacity-80"
                        />
                      )}
                    </div>
                    <h3 className="text-xs uppercase tracking-wide mb-1">{product.name}</h3>
                    <p className="text-xs text-gray-500">₹{product.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
