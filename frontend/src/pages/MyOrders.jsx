import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        
        const config = {
          headers: {
            // Attach user token for authentication
            Authorization: `Bearer ${userInfo.token}`, 
          },
        };

        const { data } = await axios.get("http://localhost:5000/api/orders/myorders", config);
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order history:", error);
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-600 animate-pulse">Loading Your History...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2 border-b-4 border-amber-500 inline-block pb-2">
          Order History
        </h1>
        <p className="text-slate-500 mb-10 mt-2">Track your past purchases and Smartstep journey.</p>

        {orders.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow-md text-center border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-600 mb-4">You haven't placed any orders yet.</h2>
            <Link to="/products" className="bg-amber-500 text-slate-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-amber-400 transition inline-block">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Order Header */}
                <div className="bg-slate-900 text-white p-4 flex flex-col md:flex-row justify-between items-center">
                  <div>
                    <span className="text-slate-400 text-sm block">Order ID</span>
                    <span className="font-mono font-bold text-amber-500">{order._id}</span>
                  </div>
                  <div className="mt-2 md:mt-0 text-center md:text-left">
                    <span className="text-slate-400 text-sm block">Date Placed</span>
                    <span className="font-bold">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-2 md:mt-0 text-center md:text-right">
                    <span className="text-slate-400 text-sm block">Total Amount</span>
                    <span className="font-bold text-xl">Rs. {order.totalPrice}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <h3 className="font-bold text-slate-800 mb-4 border-b pb-2">Items in this order:</h3>
                  <div className="space-y-4">
                    {order.orderItems.map((item) => (
                      <div key={item._id} className="flex items-center gap-4">
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded bg-slate-100 border" />
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-700">{item.title}</h4>
                          <p className="text-sm text-slate-500">Qty: {item.qty} x Rs. {item.price}</p>
                        </div>
                        <div className="font-bold text-slate-900">
                          Rs. {item.qty * item.price}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Payment & Status Info */}
                  <div className="mt-6 pt-4 border-t flex justify-between items-center">
                    <span className="bg-amber-50 text-amber-700 font-bold px-3 py-1 rounded border border-amber-200 text-sm">
                      {order.paymentMethod}
                    </span>
                    <span className={`font-bold px-3 py-1 rounded text-sm ${order.isDelivered ? 'bg-green-100 text-green-700 border-green-200' : 'bg-blue-100 text-blue-700 border-blue-200 border'}`}>
                      {order.isDelivered ? 'Delivered' : 'Processing'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;