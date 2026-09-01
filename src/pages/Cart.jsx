import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export default function Cart() {
  const { items, removeItem, getCartTotal } = useCartStore();
  const total = getCartTotal();

  const handleCheckout = () => {
    let orderText = `Hello pairescube! I want to buy:\n\n`;
    items.forEach((item) => {
      orderText += `- ${item.name} (Size: ${item.size}) x${item.quantity} = ₹${item.price * item.quantity}\n`;
    });
    orderText += `\nTotal: ₹${total}`;

    navigator.clipboard.writeText(orderText).then(() => {
      alert('Order details copied! Paste them in the Instagram chat to complete your purchase.');
      window.open('https://ig.me/m/pairescube', '_blank');
    }).catch(() => {
      alert('Order details: \n\n' + orderText + '\n\nPlease copy this and send it to @pairescube on Instagram.');
      window.open('https://ig.me/m/pairescube', '_blank');
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Cart is empty</p>
        <Link to="/" className="text-xs uppercase tracking-widest border-b border-black pb-1">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-20">
      <h1 className="text-xl uppercase tracking-widest mb-12 text-center">Cart</h1>
      
      <div className="space-y-8 mb-12 border-t border-b border-gray-100 py-8">
        {items.map((item) => (
          <div key={`${item.id}-${item.size}`} className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-16 h-20 bg-gray-50">
                {item.image_url && <img src={item.image_url} className="w-full h-full object-cover" alt="" />}
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest mb-1">{item.name}</p>
                <p className="text-xs text-gray-500">Size {item.size} • Qty {item.quantity}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs mb-2">₹{item.price * item.quantity}</p>
              <button onClick={() => removeItem(item.id, item.size)} className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-12">
        <span className="text-xs uppercase tracking-widest">Total</span>
        <span className="text-sm">₹{total}</span>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors"
      >
        Buy via Instagram
      </button>
      <p className="text-[10px] text-gray-400 text-center mt-4">
        Clicking this will copy your order and open Instagram DM.
      </p>
    </div>
  );
}
