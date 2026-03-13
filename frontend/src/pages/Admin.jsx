import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("add"); // Toggle between "add" and "manage" views
  
  // --- ADD PRODUCT STATES ---
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [discountPrice, setDiscountPrice] = useState("");

  // --- MANAGE INVENTORY STATES ---
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null); // ID of the product currently being edited
  const [editForm, setEditForm] = useState({ stock: 0, isDiscounted: false, discountPrice: 0 });

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // API Configuration Helper
  const getConfig = () => ({
    headers: { Authorization: `Bearer ${userInfo?.token}` }
  });

  // Fetch all products for the Manage Inventory tab
  useEffect(() => {
    if (activeTab === "manage") {
      fetchProducts();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("https://smartstep-backend.vercel.app/api/products", getConfig());
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle new product submission
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (isDiscounted && Number(discountPrice) >= Number(price)) {
      alert("Error: Discounted price must be lower than the original price!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("image", image);
    formData.append("isDiscounted", isDiscounted);
    formData.append("discountPrice", isDiscounted ? discountPrice : 0);

    try {
      const config = { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${userInfo?.token}` } };
      await axios.post("https://smartstep-backend.vercel.app/api/products", formData, config);
      alert("Shoe Added Successfully to Smartstep!");
      
      // Clear form fields
      setTitle(""); setPrice(""); setStock(""); setImage(null); 
      
      // Switch to manage tab after successful submission
      setActiveTab("manage"); 
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add product");
    }
  };

  // Handle edit button click
  const handleEditClick = (product) => {
    setEditingId(product._id);
    setEditForm({
      stock: product.stock,
      isDiscounted: product.isDiscounted || false,
      discountPrice: product.discountPrice || 0
    });
  };

  // Handle saving updated product
  const handleUpdateSave = async (id) => {
    try {
      await axios.put(`https://smartstep-backend.vercel.app/api/products/${id}`, editForm, getConfig());
      alert("Product Updated Successfully!");
      setEditingId(null);
      fetchProducts(); // Refresh the product list
    } catch (error) {
      alert("Error updating product");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        
        <h2 className="text-3xl font-extrabold text-slate-800 mb-6 border-b pb-4">
          Admin Dashboard
        </h2>

        {/* --- TABS --- */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab("add")}
            className={`px-6 py-2 rounded-lg font-bold transition ${activeTab === "add" ? "bg-amber-500 text-slate-900" : "bg-slate-200 text-slate-600 hover:bg-slate-300"}`}
          >
            ➕ Add New Shoe
          </button>
          <button 
            onClick={() => setActiveTab("manage")}
            className={`px-6 py-2 rounded-lg font-bold transition ${activeTab === "manage" ? "bg-amber-500 text-slate-900" : "bg-slate-200 text-slate-600 hover:bg-slate-300"}`}
          >
            📦 Manage Inventory
          </button>
        </div>

        {/* ================= TAB 1: ADD NEW SHOE ================= */}
        {activeTab === "add" && (
          <form onSubmit={handleAddSubmit} className="flex flex-col gap-5 max-w-2xl">
             <div>
              <label className="block text-slate-600 font-bold mb-1">Shoe Name</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full border p-2 rounded focus:outline-amber-500" placeholder="e.g., Nike Air Max" />
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full border p-2 rounded focus:outline-amber-500" placeholder="Product details..." />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-slate-600 font-bold mb-1">Original Price (PKR)</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full border p-2 rounded focus:outline-amber-500" />
              </div>
              <div className="flex-1">
                <label className="block text-slate-600 font-bold mb-1">Stock Quantity</label>
                <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required className="w-full border p-2 rounded focus:outline-amber-500" />
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <div className="flex items-center mb-2">
                <input type="checkbox" id="discountCheck" checked={isDiscounted} onChange={(e) => setIsDiscounted(e.target.checked)} className="w-5 h-5 text-amber-500 rounded focus:ring-amber-500" />
                <label htmlFor="discountCheck" className="ml-2 text-slate-800 font-bold cursor-pointer">Apply Discount / Sale?</label>
              </div>
              {isDiscounted && (
                <div className="mt-3">
                  <label className="block text-slate-600 font-bold mb-1">Sale Price (PKR)</label>
                  <input type="number" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} required={isDiscounted} className="w-full border p-2 rounded focus:outline-amber-500" placeholder="Enter discounted amount..." />
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-slate-600 font-bold mb-1">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border p-2 rounded focus:outline-amber-500">
                  <option value="Men">Men</option>
                  <option value="Ladies">Ladies</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-slate-600 font-bold mb-1">Upload Shoe Image</label>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} required className="w-full border p-2 rounded" accept="image/*" />
              </div>
            </div>

            <button type="submit" className="mt-4 w-full bg-slate-900 text-amber-500 font-bold py-3 rounded hover:bg-slate-800 transition shadow-md">
              Upload to Smartstep Database
            </button>
          </form>
        )}

        {/* ================= TAB 2: MANAGE INVENTORY ================= */}
        {activeTab === "manage" && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-900 text-white text-left">
                <tr>
                  <th className="py-3 px-4 font-bold">Image</th>
                  <th className="py-3 px-4 font-bold">Product Name</th>
                  <th className="py-3 px-4 font-bold">Price</th>
                  <th className="py-3 px-4 font-bold">Stock</th>
                  <th className="py-3 px-4 font-bold">Sale / Discount</th>
                  <th className="py-3 px-4 font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <img src={product.image} alt="shoe" className="w-12 h-12 object-cover rounded bg-slate-100" />
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800">{product.title}</td>
                    <td className="py-3 px-4">Rs. {product.price}</td>
                    
                    {/* EDIT MODE */}
                    {editingId === product._id ? (
                      <>
                        <td className="py-3 px-4">
                          <input type="number" value={editForm.stock} onChange={(e) => setEditForm({...editForm, stock: e.target.value})} className="w-16 border p-1 rounded" />
                        </td>
                        <td className="py-3 px-4 flex flex-col gap-1">
                          <label className="text-xs font-bold text-slate-500">On Sale?</label>
                          <input type="checkbox" checked={editForm.isDiscounted} onChange={(e) => setEditForm({...editForm, isDiscounted: e.target.checked})} className="mb-1" />
                          {editForm.isDiscounted && (
                            <input type="number" value={editForm.discountPrice} onChange={(e) => setEditForm({...editForm, discountPrice: e.target.value})} className="w-20 border p-1 rounded text-sm" placeholder="Price" />
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <button onClick={() => handleUpdateSave(product._id)} className="bg-green-500 text-white px-3 py-1 rounded font-bold hover:bg-green-600 mr-2">Save</button>
                          <button onClick={() => setEditingId(null)} className="bg-red-500 text-white px-3 py-1 rounded font-bold hover:bg-red-600">Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        {/* NORMAL VIEW */}
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded font-bold text-xs ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {product.isDiscounted ? <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">Rs. {product.discountPrice}</span> : <span className="text-slate-400 text-sm">No</span>}
                        </td>
                        <td className="py-3 px-4">
                          <button onClick={() => handleEditClick(product)} className="bg-amber-500 text-slate-900 px-4 py-1 rounded font-bold hover:bg-amber-400 shadow-sm">
                            Edit
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && <p className="text-center p-6 text-slate-500">No products found in the database.</p>}
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;