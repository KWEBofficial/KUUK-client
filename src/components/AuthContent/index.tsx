import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext) as AuthContextType;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/status`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsLoggedIn(response.status === 200);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = () => checkAuthStatus();
  const logout = () => checkAuthStatus();

  return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>;
};
