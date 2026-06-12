import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  token: string | null;
  rankRole: string | null;
  username: string | null;
  login: (token: string, role: string, user: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('kavach_token'));
  const [rankRole, setRankRole] = useState<string | null>(localStorage.getItem('kavach_role'));
  const [username, setUsername] = useState<string | null>(localStorage.getItem('kavach_user'));

  const login = (newToken: string, role: string, user: string) => {
    setToken(newToken);
    setRankRole(role);
    setUsername(user);
    localStorage.setItem('kavach_token', newToken);
    localStorage.setItem('kavach_role', role);
    localStorage.setItem('kavach_user', user);
  };

  const logout = () => {
    setToken(null);
    setRankRole(null);
    setUsername(null);
    localStorage.removeItem('kavach_token');
    localStorage.removeItem('kavach_role');
    localStorage.removeItem('kavach_user');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, rankRole, username, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be executed cleanly within an active AuthProvider container');
  }
  return context;
};