import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  refreshToken: string | null;
  userId: string | null;
  setAuthData: (token: string, refreshToken: string, userId: string) => void;
  clearAuthData: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  refreshToken: null,
  userId: null,
  setAuthData: () => {},
  clearAuthData: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedUserId = localStorage.getItem("userId");
    if (storedToken && storedRefreshToken && storedUserId) {
      setToken(storedToken);
      setRefreshToken(storedRefreshToken);
      setUserId(storedUserId);
    }
  }, []);

  const setAuthData = (newToken: string, newRefreshToken: string, newUserId: string) => {
    setToken(newToken);
    setRefreshToken(newRefreshToken);
    setUserId(newUserId);
    localStorage.setItem("token", newToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    localStorage.setItem("userId", newUserId);
  };

  const clearAuthData = () => {
    setToken(null);
    setRefreshToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ token, refreshToken, userId, setAuthData, clearAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};
