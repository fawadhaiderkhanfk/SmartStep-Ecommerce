import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://smartstep-backend.vercel.app/api/auth/signup", formData);
      
      localStorage.removeItem("userInfo");  
      alert("Registration Successful! Please Sign In to continue.");
      window.location.href = "/signin"; 
    } catch (error) {
      alert(error.response?.data?.message || "Sign Up Failed");
    }
  };

  // Handle successful Google OAuth authentication
  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    try {
      const res = await axios.post("https://smartstep-backend.vercel.app/api/auth/google", {
        name: decoded.name,
        email: decoded.email,
        googleId: decoded.sub,
      });
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      navigate("/products");
    } catch (error) {
      alert("Google Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Create Smartstep Account</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required className="border p-2 rounded" />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required className="border p-2 rounded" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="border p-2 rounded" />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Sign Up</button>
        </form>

        <div className="my-4 text-center text-gray-500">OR</div>

        {/* Google OAuth Component */}
        <div className="flex justify-center">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => alert("Login Failed")} />
        </div>

        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/signin" className="text-blue-600 font-bold">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;