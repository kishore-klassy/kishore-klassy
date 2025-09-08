import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on app start
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (userData) => {
    try {
      // Create user object with basic info
      const userInfo = {
        email: userData.email,
        name: userData.name || userData.email.split('@')[0],
        loginTime: new Date().toISOString()
      };
      
      setUser(userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Failed to login' };
    }
  };

  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('user');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: 'Failed to logout' };
    }
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;