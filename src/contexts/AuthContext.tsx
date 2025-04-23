import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api';
import { JwtPayload, AuthContextType } from '../types/login';



export const loginUser = async (email: string, password: string) => {
  const res = await api.post('users/login', { email, password });
  return res.data.token; 
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

  //check for admin role
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
