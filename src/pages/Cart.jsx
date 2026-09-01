import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function Cart() {
  const { items, removeItem, updateQuantity, getCartTotal, clearCart } = useCartStore();
  const [orderCopied, setOrderCopied] = useState(false);
  const [generatedText, setGeneratedText] = useState('');

  const total = getCartTotal();

  const handleCheckout = async () => {
    let orderText = `Hello pairescube! I'd like to order:\n\n`;
    
    items.forEach((item, index) => {
      orderText += `${index + 1}. ${item.name}\n`;
      orderText += `   Size: ${item.size}\n`;
      orderText += `   Qty: ${item.quantity}\n`;
      orderText += `   Price: ₹${item.price.toLocaleString('en-IN')} ${item.quantity > 1 ? 'each' : ''}\n\n`;
    });
    
    orderText += `Total: ₹${total.toLocaleString('en-IN')}\n\n`;
    orderText += `Please let me know the availability and next steps.`;

    setGeneratedText(orderText);

    try {
      await navigator.clipboard.writeText(orderText);
      setOrderCopied(true);
      setTimeout(() => {
        window.open('https://ig.me/m/pairescube', '_blank');
      }, 1500);
    } catch (err) {
      setOrderCopied(false);
      // Fallback is handled by showing the text block
    }
  };

  const copyManually = () => {
    navigator.clipboard.writeText(generatedText);
    toast.success('Copied to clipboard');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center animate-in fade-in">
        <h2 className="text-2xl font-serif text-primary mb-4">Your bag is empty</h2>
        <Link to="/" className="text-sm border-b border-primary text-primary pb-1 hover:text-gray-500 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 animate-in fade-in">
      <h1 className="text-3xl font-serif text-primary mb-10">Shopping Bag</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-8">
          <ul className="divide-y divide-gray-100 border-t border-b border-gray-100">
            {items.map((item) => (
              <li key={`${item.id}-${item.size}`} className="py-6 flex">
                <div className="h-32 w-24 flex-shrink-0 overflow-hidden bg-gray-50">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="h-full w-full object-cover object-center" />
                  ) : (
                    <div className="h-full w-full bg-gray-200" />
                  )}
                </div>

                <div className="ml-6 flex flex-1 flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-base font-medium text-primary">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
                    </div>
                    <p className="text-base font-medium text-primary">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                  
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center border border-gray-200">
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="p-2 text-gray-500 hover:text-primary">
                        <Minus size={14} />
                      </button>
                      <span className="px-4 text-primary font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="p-2 text-gray-500 hover:text-primary">
                        <Plus size={14} />
                      </button>
                    </div>

                    <button 
                      onClick={() => removeItem(item.id, item.size)} 
                      className="text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 size={16} /> <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="bg-gray-50 p-6">
            <h2 className="text-lg font-serif text-primary mb-6">Order Summary</h2>
            <div className="flex justify-between text-sm mb-4">
              <p className="text-gray-500">Subtotal</p>
              <p className="font-medium text-primary">₹{total.toLocaleString('en-IN')}</p>
            </div>
            <div className="flex justify-between text-sm mb-6 pb-6 border-b border-gray-200">
              <p className="text-gray-500">Shipping</p>
              <p className="text-gray-500">Calculated later</p>
            </div>
            <div className="flex justify-between text-base font-medium mb-8">
              <p className="text-primary">Total</p>
              <p className="text-primary">₹{total.toLocaleString('en-IN')}</p>
            </div>

            {!orderCopied && !generatedText ? (
              <button
                onClick={handleCheckout}
                className="w-full bg-primary text-white py-4 px-4 text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Buy via Instagram
              </button>
            ) : (
              <div className="bg-white p-4 border border-green-200 rounded-sm">
                <p className="text-sm text-green-700 font-medium mb-2">
                  {orderCopied ? "Order details copied!" : "Please copy your order details"}
                </p>
                <p className="text-xs text-gray-600 mb-4">
                  Paste them into the Instagram chat to complete your order. We are redirecting you...
                </p>
                {generatedText && (
                  <div className="relative">
                    <pre className="text-[10px] bg-gray-50 p-2 overflow-auto max-h-32 text-gray-600 border border-gray-100">
                      {generatedText}
                    </pre>
                    <button onClick={copyManually} className="mt-2 text-xs text-primary underline">
                      Copy Again
                    </button>
                  </div>
                )}
                <a 
                  href="https://ig.me/m/pairescube" 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-4 block text-center w-full bg-primary text-white py-3 text-xs font-medium hover:bg-gray-800 transition-colors"
                >
                  Open Instagram Chat
                </a>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
