import type { User } from '@supabase/supabase-js';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const isAdmin = () => {
    if (!context.user) return false;
    // You can implement your own admin role check logic here
    return context.user.app_metadata?.role === 'admin';
  };

  return {
    ...context,
    isAdmin,
  };
} 