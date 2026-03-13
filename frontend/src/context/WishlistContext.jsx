import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  // Load wishlist from local storage on initial render
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("smartstep_wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save wishlist to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("smartstep_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Add or remove item from wishlist (Fixed double toast issue)
  const toggleWishlist = (product) => {
    // Check outside the state setter to avoid React StrictMode double rendering issue
    const isExisting = wishlist.find((item) => item._id === product._id);
    
    if (isExisting) {
      toast.success(`${product.title} removed from wishlist 💔`);
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== product._id));
    } else {
      toast.success(`${product.title} added to wishlist ❤️`);
      setWishlist((prevWishlist) => [...prevWishlist, product]);
    }
  };

  // Check if a product is already in the wishlist (to show solid or empty heart)
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};