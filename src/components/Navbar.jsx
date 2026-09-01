import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="border-b border-gray-100 bg-white">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-sm font-semibold tracking-widest uppercase">
          Pairescube
        </Link>
        <Link to="/cart" className="text-xs uppercase tracking-widest hover:text-gray-500">
          Cart ({totalItems})
        </Link>
      </div>
    </nav>
  );
}
