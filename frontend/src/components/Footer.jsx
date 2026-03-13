import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t-4 border-amber-500 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-extrabold text-amber-500 mb-4 tracking-wider">SMARTSTEP</h2>
          <p className="text-sm leading-relaxed mb-6">
            Step into style and walk with confidence. We provide the best quality footwear for men, women, and kids.
          </p>
          <div className="flex gap-4 text-xl">
            <span className="cursor-pointer hover:text-amber-500 transition">📱</span>
            <span className="cursor-pointer hover:text-amber-500 transition">📸</span>
            <span className="cursor-pointer hover:text-amber-500 transition">🐦</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm flex flex-col">
            <Link to="/" className="hover:text-amber-500 transition w-fit">Home</Link>
            <Link to="/products" className="hover:text-amber-500 transition w-fit">Our Collection</Link>
            <Link to="/wishlist" className="hover:text-amber-500 transition w-fit">Wishlist</Link>
            <Link to="/cart" className="hover:text-amber-500 transition w-fit">Cart</Link>
          </ul>
        </div>

        {/* Categories (Links added with category state) */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Categories</h3>
          <ul className="space-y-2 text-sm flex flex-col">
            <Link to="/products" state={{ category: "Men" }} className="hover:text-amber-500 transition w-fit">Men's Sneakers</Link>
            <Link to="/products" state={{ category: "Ladies" }} className="hover:text-amber-500 transition w-fit">Ladies Heels</Link>
            <Link to="/products" state={{ category: "Kids" }} className="hover:text-amber-500 transition w-fit">Kids Collection</Link>
            <Link to="/products" state={{ category: "Sale" }} className="hover:text-red-500 font-bold transition w-fit">🔥 Sale Items</Link>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><span>📍</span> Abbottabad, Pakistan</li>
            <li className="flex items-center gap-2"><span>📞</span> +92 300 1234567</li>
            <li className="flex items-center gap-2"><span>✉️</span> support@smartstep.com</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-slate-700 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} SmartStep Footwear. Developed by Fawad Haider Khan.</p>
      </div>
    </footer>
  );
};

export default Footer;