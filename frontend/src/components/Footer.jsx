import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-10 border-t-4 border-amber-500 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-amber-500 mb-4 tracking-wider">SMARTSTEP</h2>
          <p className="text-sm mb-4 leading-relaxed">
            Step into style and walk with confidence. We provide the best quality footwear for men, women, and kids.
          </p>
          <div className="flex gap-4 text-xl">
            <span className="cursor-pointer hover:-translate-y-1 transition transform">📱</span> 
            <span className="cursor-pointer hover:-translate-y-1 transition transform">📸</span> 
            <span className="cursor-pointer hover:-translate-y-1 transition transform">🐦</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold mb-4 text-lg">Quick Links</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link to="/" onClick={scrollToTop} className="hover:text-amber-500 transition">Home</Link></li>
            <li><Link to="/products" onClick={scrollToTop} className="hover:text-amber-500 transition">Our Collection</Link></li>
            <li><Link to="/wishlist" onClick={scrollToTop} className="hover:text-amber-500 transition">Wishlist</Link></li>
            <li><Link to="/cart" onClick={scrollToTop} className="hover:text-amber-500 transition">Cart</Link></li>
          </ul>
        </div>

        {/* Categories (Smart Links) */}
        <div>
          <h3 className="text-white font-bold mb-4 text-lg">Categories</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <Link to="/products" state={{ category: "Men" }} onClick={scrollToTop} className="hover:text-amber-500 transition">
                Men's Sneakers
              </Link>
            </li>
            <li>
              <Link to="/products" state={{ category: "Ladies" }} onClick={scrollToTop} className="hover:text-amber-500 transition">
                Ladies Heels
              </Link>
            </li>
            <li>
              <Link to="/products" state={{ category: "Kids" }} onClick={scrollToTop} className="hover:text-amber-500 transition">
                Kids Collection
              </Link>
            </li>
            <li>
              <Link to="/products" state={{ category: "Sale" }} onClick={scrollToTop} className="hover:text-amber-500 transition">
                🔥 Sale Items
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-white font-bold mb-4 text-lg">Contact Us</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-center gap-2"><span>📍</span> Abbottabad, Pakistan</li>
            <li className="flex items-center gap-2"><span>📞</span> +92 300 1234567</li>
            <li className="flex items-center gap-2"><span>✉️</span> support@smartstep.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-800 mt-10 pt-6 text-center text-xs md:text-sm text-slate-500 px-6">
        © 2026 SmartStep Footwear. Developed by Fawad Haider Khan.
      </div>
    </footer>
  );
};

export default Footer;