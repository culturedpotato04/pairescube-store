import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-xl font-serif font-bold tracking-widest text-primary mb-4">
            pairescube
          </h2>
          <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
            Premium women's footwear designed for elegance, comfort, and the modern lifestyle.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <a href="https://instagram.com/pairescube" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
            <a href="#" className="hover:text-primary transition-colors">Shipping & Returns</a>
          </div>
          <p className="mt-8 text-xs text-gray-400">
            &copy; {new Date().getFullYear()} pairescube. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
