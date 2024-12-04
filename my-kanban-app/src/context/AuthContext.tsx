// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  user: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  // Mock login function
  const login = async (email: string, password: string) => {
    // In a real application, replace this with API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simple mock: accept any email/password combination
        if (email && password) {
          setIsAuthenticated(true);
          setUser(email);
          navigate('/'); // Redirect to home after login
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 5000); // Simulate network delay
    });
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
