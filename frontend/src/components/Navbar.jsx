import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/signin");
    setIsMenuOpen(false); 
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" onClick={closeMenu} className="text-2xl font-bold text-amber-500 tracking-wider">
            SMARTSTEP
          </Link>

          <button 
            className="md:hidden text-amber-500 hover:text-amber-400 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-6 items-center">
            {!userInfo ? (
              <>
                <Link to="/signin" className="hover:text-amber-400 transition">Sign In</Link>
                <Link to="/signup" className="bg-amber-500 text-slate-900 px-4 py-2 rounded font-bold hover:bg-amber-400 transition">
                  Sign Up
                </Link>
              </>
            ) : (
              <>

                <span className="text-amber-400 font-bold tracking-wide border-r border-slate-600 pr-4 flex items-center gap-2">
                  👋 Welcome, {userInfo?.name?.split(" ")[0]}!
                </span>

                <Link to="/products" className="hover:text-amber-400 transition">Products</Link>
                <Link to="/wishlist" className="hover:text-amber-400 transition">Wishlist ❤️</Link> 
                <Link to="/cart" className="hover:text-amber-400 transition">Cart 🛒</Link>
                <Link to="/myorders" className="hover:text-amber-400 transition">My Orders</Link>
                
                {userInfo.role === "admin" && (
                  <Link to="/admin" className="text-red-400 hover:text-red-300 font-bold">Admin Panel</Link>
                )}
                
                <button 
                  onClick={handleLogout} 
                  className="bg-red-600 px-4 py-2 rounded font-bold hover:bg-red-500 transition shadow-md"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden flex flex-col gap-4 mt-4 bg-slate-800 p-4 rounded-lg border border-slate-700 transition-all duration-300 shadow-xl">
          
            {userInfo && (
              <div className="text-amber-400 font-bold text-center text-lg border-b border-slate-600 pb-3 mb-1">
                👋 Welcome, {userInfo.name}!
              </div>
            )}

            {!userInfo ? (
              <>
                <Link to="/signin" onClick={closeMenu} className="block text-center hover:text-amber-400 transition py-2 border-b border-slate-700">Sign In</Link>
                <Link to="/signup" onClick={closeMenu} className="block bg-amber-500 text-center text-slate-900 px-4 py-2 rounded font-bold hover:bg-amber-400 transition mt-2">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link to="/products" onClick={closeMenu} className="block text-center hover:text-amber-400 transition py-2 border-b border-slate-700">Products</Link>
                <Link to="/wishlist" onClick={closeMenu} className="block text-center hover:text-amber-400 transition py-2 border-b border-slate-700">Wishlist ❤️</Link> 
                <Link to="/cart" onClick={closeMenu} className="block text-center hover:text-amber-400 transition py-2 border-b border-slate-700">Cart 🛒</Link>
                <Link to="/myorders" onClick={closeMenu} className="block text-center hover:text-amber-400 transition py-2 border-b border-slate-700">My Orders</Link>
                
                {userInfo.role === "admin" && (
                  <Link to="/admin" onClick={closeMenu} className="block text-center text-red-400 hover:text-red-300 font-bold py-2 border-b border-slate-700">Admin Panel</Link>
                )}
                
                <button 
                  onClick={handleLogout} 
                  className="bg-red-600 w-full px-4 py-2 mt-2 rounded font-bold hover:bg-red-500 transition shadow-md"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;