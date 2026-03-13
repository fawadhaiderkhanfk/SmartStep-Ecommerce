import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  // Extract cart state and functions from Context
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const cartTotal = cart.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Top Header with Clear Cart Button */}
        <div className="flex justify-between items-end mb-8 border-b-4 border-amber-500 pb-2">
          <h1 className="text-4xl font-extrabold text-slate-900">
            Your Shopping Cart
          </h1>
          {/* Render Clear Cart button only if cart has items */}
          {cart.length > 0 && (
            <button 
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition shadow-md mb-1"
            >
              Clear Cart 🗑️
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow-md text-center border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-600 mb-4">Your cart is currently empty.</h2>
            <Link 
              to="/products" 
              className="bg-amber-500 text-slate-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-amber-400 transition inline-block shadow-md"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item._id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg bg-slate-100" />
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
                      <p className="text-slate-500 text-sm">Rs. {item.price}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 md:gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    
                    {/* Quantity control buttons */}
                    <div className="flex items-center bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                      <button 
                        onClick={() => decreaseQuantity(item._id)}
                        className="px-3 py-1 bg-slate-200 hover:bg-slate-300 font-bold text-slate-700 transition text-lg"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 font-bold text-slate-900 w-12 text-center">
                        {item.qty}
                      </span>
                      <button 
                        onClick={() => increaseQuantity(item._id)}
                        className="px-3 py-1 bg-slate-200 hover:bg-slate-300 font-bold text-slate-700 transition text-lg"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-lg font-extrabold text-slate-900 w-24 text-right">
                      Rs. {item.price * item.qty}
                    </div>
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700 font-bold bg-red-50 px-3 py-1 rounded-lg transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl h-fit sticky top-10">
              <h2 className="text-2xl font-bold mb-6 text-amber-500 border-b border-slate-700 pb-4">
                Order Summary
              </h2>
              
              <div className="flex justify-between items-center mb-4 text-slate-300">
                <span>Total Items:</span>
                <span className="font-bold">{cart.reduce((total, item) => total + item.qty, 0)}</span>
              </div>
              
              <div className="flex justify-between items-center mb-8 text-xl">
                <span className="font-bold">Total Price:</span>
                <span className="font-extrabold text-amber-500">Rs. {cartTotal}</span>
              </div>

              <button 
                onClick={() => navigate("/checkout")}
                className="w-full bg-amber-500 text-slate-900 py-3 rounded-lg font-bold text-lg hover:bg-amber-400 transition shadow-md"
              >
                Proceed to Checkout
              </button>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;