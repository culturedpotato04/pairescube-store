import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,
  
  initialize: async () => {
    if (!supabase) {
      set({ loading: false });
      return;
    }
    const { data: { session } } = await supabase.auth.getSession();
    set({ session, user: session?.user || null, loading: false });
    
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user || null });
    });
  },
  
  login: async (email, password) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      set({ user: data.user, session: data.session, loading: false });
      return { success: true };
    } catch (error) {
      set({ loading: false });
      return { success: false, error: error.message };
    }
  },
  
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null });
  }
}));
