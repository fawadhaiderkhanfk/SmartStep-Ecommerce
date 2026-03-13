import React from "react";
import { Link } from "react-router-dom";
import heroShoe from "../assets/hero-shoe.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between p-6 md:p-16 min-h-[80vh]">
          
          {/* Text Content */}
          <div className="md:w-1/2 z-10 text-center md:text-left mt-10 md:mt-0">
            <span className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-2 block">New Collection 2026</span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              Step Into <br /> <span className="text-amber-500 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Greatness.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-lg mx-auto md:mx-0">
              Discover the perfect blend of comfort, durability, and modern aesthetics. Your journey to better style starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {/* Primary Action */}
              <Link to="/products" className="bg-amber-500 text-slate-900 px-8 py-4 rounded-full font-extrabold text-lg hover:bg-amber-400 transition transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(245,158,11,0.3)] text-center">
                Explore Collection 🚀
              </Link>
              
              {/* Secondary Action */}
              <Link to="/signup" className="bg-transparent border-2 border-slate-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:border-white hover:text-amber-500 transition text-center">
                Join Us 👋
              </Link>
            </div>
          </div>

          {/* Hero Image / Graphics */}
          <div className="md:w-1/2 mt-16 md:mt-0 relative flex justify-center">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500 rounded-full blur-[100px] opacity-20"></div>
            
            <img 
              src={heroShoe} 
              alt="SmartStep Premium Aura Sneaker" 
              className="w-[90%] md:w-[100%] relative z-10 drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] rounded-3xl transform hover:scale-105 transition duration-500 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Quick Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Fast Delivery</h3>
            <p className="text-slate-500">Get your shoes delivered right to your doorstep quickly.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Premium Quality</h3>
            <p className="text-slate-500">Crafted with the finest materials for long-lasting comfort.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition">
            <div className="text-4xl mb-4">💯</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Best Prices</h3>
            <p className="text-slate-500">Enjoy exclusive discounts and unbeatable prices.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;