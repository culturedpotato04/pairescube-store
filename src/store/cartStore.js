import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, size) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (item) => item.id === product.id && item.size === size
        );
        
        if (existingItemIndex > -1) {
          const newItems = [...items];
          newItems[existingItemIndex].quantity += 1;
          set({ items: newItems });
        } else {
          set({ items: [...items, { ...product, size, quantity: 1 }] });
        }
      },
      
      removeItem: (productId, size) => {
        set({
          items: get().items.filter(
            (item) => !(item.id === productId && item.size === size)
          ),
        });
      },
      
      updateQuantity: (productId, size, quantity) => {
        if (quantity < 1) return;
        const newItems = get().items.map((item) => {
          if (item.id === productId && item.size === size) {
            return { ...item, quantity };
          }
          return item;
        });
        set({ items: newItems });
      },
      
      clearCart: () => set({ items: [] }),
      
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'pairescube-cart',
    }
  )
);
