import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api';
import { JwtPayload, AuthContextType } from '../types/login';

// --- API Calls & Helpers ---

export const loginUser = async (email: string, password: string) => {
  const res = await api.post('users/login', { email, password });
  return res.data.token; // Returns only the token string
};

export const registerUser = async (username: string, email: string, password: string) => {
  const res = await api.post('users/register', { username, email, password });
  return res.data;
};

export function getCurrentUser(): JwtPayload | null {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}

// --- Auth Context ---

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<JwtPayload | null>(getCurrentUser());

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setUser(getCurrentUser());
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Case-insensitive check for admin role
  const isAdmin = user?.role?.toLowerCase() === 'admin';

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
