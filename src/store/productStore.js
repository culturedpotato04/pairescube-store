import { create } from 'zustand';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const useProductStore = create((set, get) => ({
  products: [],
  categories: [],
  loading: false,
  error: null,
  
  fetchCategories: async () => {
    if (!isSupabaseConfigured) return;
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.from('categories').select('*').order('name');
      if (error) throw error;
      set({ categories: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  fetchProducts: async () => {
    if (!isSupabaseConfigured) return;
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`*, categories(id, name, slug)`)
        .order('created_at', { ascending: false });
      if (error) throw error;
      set({ products: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  // For Admin Actions
  addProduct: async (productData) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.from('products').insert([productData]).select();
      if (error) throw error;
      await get().fetchProducts();
      return { success: true, data };
    } catch (error) {
      set({ loading: false });
      return { success: false, error: error.message };
    }
  },
  
  updateProduct: async (id, productData) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.from('products').update(productData).eq('id', id).select();
      if (error) throw error;
      await get().fetchProducts();
      return { success: true, data };
    } catch (error) {
      set({ loading: false });
      return { success: false, error: error.message };
    }
  },
  
  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      await get().fetchProducts();
      return { success: true };
    } catch (error) {
      set({ loading: false });
      return { success: false, error: error.message };
    }
  }
}));
