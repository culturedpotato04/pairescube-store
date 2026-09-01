import React from 'react';
import { useParams } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import ProductCard from '../components/ProductCard';

export default function Category() {
  const { slug } = useParams();
  const { products, categories, loading } = useProductStore();

  const category = categories.find(c => c.slug === slug);
  
  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center">Loading...</div>;
  }

  if (!category) {
    return <div className="min-h-[60vh] flex items-center justify-center">Category not found</div>;
  }

  const categoryProducts = products.filter(p => p.category_id === category.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
      <div className="mb-12 border-b border-gray-100 pb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-serif text-primary mb-4">{category.name}</h1>
        <p className="text-gray-500 text-sm">
          {categoryProducts.length} {categoryProducts.length === 1 ? 'Product' : 'Products'}
        </p>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 lg:gap-x-8">
          {categoryProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          No products currently available in this category.
        </div>
      )}
    </div>
  );
}
