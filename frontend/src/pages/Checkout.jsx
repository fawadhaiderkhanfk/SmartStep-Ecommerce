import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const cartTotal = cart.reduce((total, item) => total + item.price * item.qty, 0);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const placeOrderHandler = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        "https://smartstep-backend.vercel.app/api/orders",
        {
          orderItems: cart,
          paymentMethod: "Cash on Delivery",
          totalPrice: cartTotal,
        },
        config
      );

      toast.success("Order Placed Successfully! 🎉");
      clearCart(); 
      navigate("/"); 
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    }
  };

  if (cart.length === 0) {
    navigate("/products");
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-10 flex justify-center items-start">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-100">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 border-b pb-4">Checkout & Confirm</h1>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-amber-500 mb-4">Order Items</h2>
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center bg-slate-50 p-3 rounded border">
                <span className="font-bold text-slate-800">{item.title} <span className="text-slate-500">(x{item.qty})</span></span>
                <span className="font-bold">Rs. {item.price * item.qty}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 bg-amber-50 p-4 rounded-lg border border-amber-200">
          <h2 className="text-lg font-bold text-slate-800 mb-2">Payment Method</h2>
          <p className="text-amber-700 font-bold text-xl flex items-center gap-2">
            🚚 Cash on Delivery (COD) Only
          </p>
        </div>

        <div className="flex justify-between items-center border-t pt-6 mb-8">
          <span className="text-2xl font-bold text-slate-600">Total to Pay:</span>
          <span className="text-3xl font-extrabold text-slate-900">Rs. {cartTotal}</span>
        </div>

        <button 
          onClick={placeOrderHandler}
          className="w-full bg-slate-900 text-amber-500 py-4 rounded-xl font-extrabold text-xl hover:bg-slate-800 transition shadow-lg"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;