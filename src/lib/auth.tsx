import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '../types';
import { ADMIN_USER, SAMPLE_STUDENT } from '../data/seed';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isAdmin: boolean;
}

interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  referralCode?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = 'jft_users';
const SESSION_KEY = 'jft_session';

function getUsers(): User[] {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) {
    const defaults = [ADMIN_USER, SAMPLE_STUDENT];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaults));
    return defaults;
  }
  return JSON.parse(raw);
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function generateReferralCode(): string {
  return 'JFT' + Math.random().toString(36).substring(2, 7).toUpperCase();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionId = localStorage.getItem(SESSION_KEY);
    if (sessionId) {
      const users = getUsers();
      const found = users.find(u => u.id === sessionId && u.isActive);
      if (found) setUser(found);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const users = getUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) return { success: false, error: 'Invalid email or password' };
    if (!found.isActive) return { success: false, error: 'Account is disabled' };
    localStorage.setItem(SESSION_KEY, found.id);
    setUser(found);
    return { success: true };
  };

  const register = async (data: RegisterData) => {
    const users = getUsers();
    if (users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { success: false, error: 'Email already registered' };
    }

    let referredBy: string | undefined;
    if (data.referralCode) {
      const referrer = users.find(u => u.referralCode === data.referralCode.toUpperCase());
      if (referrer) referredBy = referrer.id;
    }

    const newUser: User = {
      id: 'user-' + Date.now(),
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      password: data.password,
      referralCode: generateReferralCode(),
      referredBy,
      role: 'student',
      level: 'Beginner',
      xp: 0,
      streak: 0,
      memberSince: new Date().toISOString().split('T')[0],
      isActive: true,
      completedLessons: [],
      favorites: { vocabulary: [], kanji: [], grammar: [] },
      learned: { vocabulary: [], kanji: [] },
      wallet: { available: 0, pending: 0, totalEarned: 0, totalWithdrawn: 0 },
    };

    users.push(newUser);
    saveUsers(users);
    localStorage.setItem(SESSION_KEY, newUser.id);
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx === -1) return;
    const updated = { ...users[idx], ...updates };
    users[idx] = updated;
    saveUsers(users);
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      updateUser,
      isAdmin: user?.role === 'admin',
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
