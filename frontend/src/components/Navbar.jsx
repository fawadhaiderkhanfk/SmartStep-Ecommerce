import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  // Retrieve user info from local storage to check authentication status
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/signin");
  };

  return (
    <nav className="bg-slate-900 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-bold text-amber-500 tracking-wider">
          SMARTSTEP
        </Link>

        {/* Conditional Navigation Links */}
        <div className="flex gap-6 items-center">
          {!userInfo ? (
            // Unauthenticated View: Show Sign In and Sign Up
            <>
              <Link to="/signin" className="hover:text-amber-400 transition">Sign In</Link>
              <Link to="/signup" className="bg-amber-500 text-slate-900 px-4 py-2 rounded font-bold hover:bg-amber-400 transition">
                Sign Up
              </Link>
            </>
          ) : (
            // Authenticated View: Show user-specific links
            <>
              <Link to="/products" className="hover:text-amber-400 transition">Products</Link>
              <Link to="/wishlist" className="hover:text-amber-400 transition">Wishlist ❤️</Link> 
              <Link to="/cart" className="hover:text-amber-400 transition">Cart 🛒</Link>
              <Link to="/myorders" className="hover:text-amber-400 transition">My Orders</Link>
              
              {/* Admin-only link */}
              {userInfo.role === "admin" && (
                <Link to="/admin" className="text-red-400 hover:text-red-300 font-bold">Admin Panel</Link>
              )}
              
              <button 
                onClick={handleLogout} 
                className="bg-red-600 px-4 py-2 rounded font-bold hover:bg-red-500 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;