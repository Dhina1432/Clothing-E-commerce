// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import API from "../services/api.js";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth on first load
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");

      // If no token in localStorage, user is not logged in
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      // Axios interceptor will attach Authorization header
      const response = await API.get("/auth/me");
      // backend: { success: true, user: {...} }
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await API.post("/auth/login", { email, password });
      // backend should return: { success, token, user }
      const { token, user } = response.data;

      // Save token so interceptor can send it on every request
      localStorage.setItem("token", token);
      setUser(user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await API.post("/auth/register", {
        name,
        email,
        password,
      });
      // backend: { success, token, user }
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      setUser(user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = async () => {
    try {
      // Optional: if you implemented /auth/logout on backend, you can call it:
      // await API.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
