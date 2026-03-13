import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast"; 

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("smartstep_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("smartstep_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      
      if (existingItem) {
        if (existingItem.qty < existingItem.stock) {
          return prevCart.map((item) =>
            item._id === product._id ? { ...item, qty: item.qty + 1 } : item
          );
        } else {
          toast.error(`Maximum stock reached! Only ${existingItem.stock} available.`);
          return prevCart;
        }
      } else {
        return [...prevCart, { ...product, qty: 1 }];
      }
    });
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) => 
      prevCart.map((item) => {
        if (item._id === id) {
          if (item.qty < item.stock) {
            return { ...item, qty: item.qty + 1 };
          } else {
            toast.error(`Sorry, only ${item.stock} items in stock!`);
            return item;
          }
        }
        return item;
      })
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) => 
      prevCart.map((item) => 
        item._id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
    toast.success("Item removed from cart"); // Added a nice success toast
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Cart cleared"); // Added a nice success toast
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};