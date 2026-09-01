import React from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { products, categories, loading } = useProductStore();

  const featuredProducts = products.filter(p => p.is_featured).slice(0, 4);
  const newArrivals = products.filter(p => !p.is_featured).slice(0, 4);

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center">Loading collection...</div>;
  }

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] bg-gray-50 flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?w=1600&q=80" 
          alt="Hero background" 
          className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl text-white font-serif tracking-wide mb-6 drop-shadow-md">
            Step Into Elegance
          </h1>
          <p className="text-white/90 text-lg mb-10 font-light drop-shadow">
            Discover the new collection of premium footwear designed for the modern woman.
          </p>
          <Link 
            to={`/category/${categories[0]?.slug || ''}`}
            className="inline-block bg-white text-primary px-8 py-3 text-sm font-medium tracking-widest hover:bg-gray-100 transition-colors"
          >
            SHOP COLLECTION
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-2xl font-serif text-primary">Featured Selection</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 lg:gap-x-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Categories Grid */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif text-primary text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {categories.slice(0, 6).map((cat, idx) => (
              <Link 
                key={cat.id} 
                to={`/category/${cat.slug}`}
                className="group relative aspect-square md:aspect-[4/3] overflow-hidden bg-white flex items-center justify-center"
              >
                <div className="z-10 text-center">
                  <h3 className="text-lg md:text-xl font-serif text-primary group-hover:scale-110 transition-transform duration-300">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-serif text-primary">New Arrivals</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 lg:gap-x-8">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
