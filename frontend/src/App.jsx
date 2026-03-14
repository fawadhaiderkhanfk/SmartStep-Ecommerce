import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast"; 
import { WishlistProvider } from "./context/WishlistContext"; 
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer"; 
import Home from "./pages/Home";        
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Admin from "./pages/Admin";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Wishlist from "./pages/Wishlist"; 

// Custom wrapper to protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const userInfo = localStorage.getItem("userInfo");
  return userInfo ? children : <Navigate to="/signin" />;
};

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <WishlistProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Toaster position="top-center" reverseOrder={false} />
            
            <Navbar /> 
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
                <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} /> 
                <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path="/myorders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
              </Routes>
            </main>
            
            <Footer />
          </div>
        </BrowserRouter>
      </WishlistProvider>
    </GoogleOAuthProvider>
  );
}

export default App;