import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <span className="text-6xl mb-4">💔</span>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Your Wishlist is Empty</h2>
        <p className="text-slate-500 mb-6">You haven't saved any shoes yet.</p>
        <Link to="/products" className="bg-amber-500 text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-amber-400 transition shadow-md">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8 border-b-4 border-amber-500 inline-block pb-2">
          My Wishlist ❤️
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((product) => (
            <div key={product._id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 flex flex-col relative group">
              
              {/* Remove from Wishlist Button */}
              <button 
                onClick={() => toggleWishlist(product)}
                className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-md text-xl hover:scale-110 transition-transform duration-200"
              >
                ❤️
              </button>

              <div className="h-64 overflow-hidden bg-slate-100 flex items-center justify-center">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{product.title}</h2>
                <span className="text-amber-500 text-sm font-bold mb-4">{product.category}</span>
                
                <div className="flex-grow"></div>
                
                <div className="flex flex-col mb-4">
                    <span className="text-xl font-extrabold text-slate-900">
                      Rs. {product.isDiscounted ? product.discountPrice : product.price}
                    </span>
                </div>
                
                <button 
                  disabled={product.stock <= 0}
                  onClick={() => {
                    const productForCart = product.isDiscounted ? { ...product, price: product.discountPrice } : product;
                    addToCart(productForCart);
                    toast.success(`${product.title} added to cart! 🛒`);
                  }}
                  className={`w-full py-2 rounded-lg font-bold transition shadow-md ${
                    product.stock <= 0 ? "bg-slate-300 text-slate-500 cursor-not-allowed" : "bg-slate-900 text-amber-500 hover:bg-slate-800"
                  }`}
                >
                  {product.stock <= 0 ? "Out of Stock" : "Move to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;