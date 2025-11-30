import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";
import API from "../services/api.js";

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const { user } = useAuth();

  // Load cart from API when user logs in, from localStorage when guest
  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/immutability
      loadCartFromAPI();
    } else {
      // eslint-disable-next-line react-hooks/immutability
      loadCartFromLocalStorage();
    }
  }, [user]);

  const loadCartFromAPI = async () => {
    try {
      const response = await API.get("/cart");
      setCart(response.data.cart);
    } catch (error) {
      console.error("Error loading cart from API:", error);
    }
  };

  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("guestCart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const saveCartToLocalStorage = (cartData) => {
    localStorage.setItem("guestCart", JSON.stringify(cartData));
  };

  const addToCart = async (product, size, quantity = 1) => {
    if (user) {
      // For logged-in users
      try {
        const response = await API.post("/cart/add", {
          productId: product._id,
          size,
          quantity,
        });
        setCart(response.data.cart);
        return { success: true };
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || "Failed to add to cart",
        };
      }
    } else {
      // For guest users
      const newCart = { ...cart };
      const existingItemIndex = newCart.items.findIndex(
        (item) => item.product._id === product._id && item.size === size
      );

      if (existingItemIndex > -1) {
        newCart.items[existingItemIndex].quantity += quantity;
      } else {
        newCart.items.push({
          product,
          size,
          quantity,
          _id: Date.now().toString(), // Temporary ID for guest items
        });
      }

      setCart(newCart);
      saveCartToLocalStorage(newCart);
      return { success: true };
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    if (user) {
      try {
        const response = await API.put("/cart/update", {
          itemId,
          quantity,
        });
        setCart(response.data.cart);
        return { success: true };
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || "Failed to update cart",
        };
      }
    } else {
      const newCart = { ...cart };
      const itemIndex = newCart.items.findIndex((item) => item._id === itemId);

      if (itemIndex > -1) {
        if (quantity <= 0) {
          newCart.items.splice(itemIndex, 1);
        } else {
          newCart.items[itemIndex].quantity = quantity;
        }

        setCart(newCart);
        saveCartToLocalStorage(newCart);
      }
      return { success: true };
    }
  };

  const removeFromCart = async (itemId) => {
    if (user) {
      try {
        const response = await API.delete("/cart/remove", {
          data: { itemId },
        });
        setCart(response.data.cart);
        return { success: true };
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || "Failed to remove item",
        };
      }
    } else {
      const newCart = {
        ...cart,
        items: cart.items.filter((item) => item._id !== itemId),
      };
      setCart(newCart);
      saveCartToLocalStorage(newCart);
      return { success: true };
    }
  };

  const clearCart = () => {
    setCart({ items: [] });
    if (!user) {
      localStorage.removeItem("guestCart");
    }
  };

  const getCartTotal = () => {
    return cart.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  const getCartItemsCount = () => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    loadCartFromAPI,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
