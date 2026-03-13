import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext"; 
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast"; 

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const location = useLocation(); 
  
  const [selectedCategory, setSelectedCategory] = useState(location.state?.category || "All"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); 

  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
        
        const { data } = await axios.get("https://smartstep-backend.vercel.app/api/products", config);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products!"); 
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getFilteredAndSortedProducts = () => {
    let result = [...products]; 

    if (searchQuery.trim() !== "") {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      if (selectedCategory === "Sale") {
        result = result.filter(product => product.isDiscounted === true);
      } else {
        result = result.filter(product => product.category === selectedCategory);
      }
    }

    if (sortOrder === "priceLow") {
      result.sort((a, b) => {
        const priceA = a.isDiscounted ? a.discountPrice : a.price;
        const priceB = b.isDiscounted ? b.discountPrice : b.price;
        return priceA - priceB;
      });
    } else if (sortOrder === "priceHigh") {
      result.sort((a, b) => {
        const priceA = a.isDiscounted ? a.discountPrice : a.price;
        const priceB = b.isDiscounted ? b.discountPrice : b.price;
        return priceB - priceA; 
      });
    } else if (sortOrder === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  };

  const finalProducts = getFilteredAndSortedProducts();

  // Skeleton Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Skeleton Header */}
          <div className="h-10 w-48 md:w-64 bg-slate-200 rounded-lg animate-pulse mb-4"></div>
          <div className="h-4 w-64 md:w-96 bg-slate-200 rounded animate-pulse mb-8"></div>
          
          {/* Skeleton Search & Filter Bar */}
          <div className="h-16 w-full bg-slate-200 rounded-xl animate-pulse mb-6"></div>
          <div className="flex gap-4 mb-10 overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 w-20 md:w-24 shrink-0 bg-slate-200 rounded-full animate-pulse"></div>
            ))}
          </div>

          {/* Skeleton Product Grid (Updated for Mobile: 2, Tablet: 3, Laptop: 4) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 h-[300px] md:h-[420px] p-3 md:p-6 flex flex-col animate-pulse">
                <div className="h-32 md:h-48 bg-slate-200 rounded-xl mb-4 md:mb-6 w-full"></div>
                <div className="h-4 md:h-6 bg-slate-200 rounded w-3/4 mb-2 md:mb-3"></div>
                <div className="h-3 md:h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
                <div className="flex-grow"></div>
                <div className="flex justify-between items-center mt-2 md:mt-4 pt-2 md:pt-4 border-t border-slate-100">
                  <div className="h-6 md:h-8 bg-slate-200 rounded w-1/3"></div>
                  <div className="h-8 md:h-10 bg-slate-200 rounded-lg w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 border-b-4 border-amber-500 inline-block pb-2">
          Our Exclusive Collection
        </h1>
        <p className="text-slate-500 mb-6 md:mb-8 mt-2 text-sm md:text-base">Find the perfect pair for every step of your journey.</p>

        {/* Enhanced Search & Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          
          {/* New Search Input with Icon */}
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Search shoes, sneakers, brands..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-3 pr-12 outline-none transition"
            />
            {/* Search Icon Button */}
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-amber-500 p-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="w-full md:w-64">
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-3 outline-none transition cursor-pointer"
            >
              <option value="newest">Sort by: Newest Arrivals</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {["All", "Men", "Ladies", "Kids", "Sale"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 text-sm md:text-base rounded-full font-bold transition-all shadow-sm whitespace-nowrap ${
                selectedCategory === category
                  ? category === "Sale" ? "bg-red-600 text-white" : "bg-slate-900 text-amber-500" 
                  : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              {category === "Sale" ? "🔥 Sale" : category}
            </button>
          ))}
        </div>

        {/* Updated Product Grid (Mobile: 2, Tablet: 3, Laptop: 4) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {finalProducts.map((product) => (
            <div key={product._id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100 hover:shadow-xl transition-shadow duration-300 flex flex-col relative">
              
              {product.isDiscounted && (
                <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10 bg-red-600 text-white text-[10px] md:text-xs font-black px-2 py-1 md:px-3 rounded-full shadow-md animate-pulse">
                  SALE
                </div>
              )}

              <div className="h-36 md:h-56 lg:h-64 overflow-hidden bg-slate-100 flex items-center justify-center relative group">
                <button 
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-2 right-2 md:top-4 md:right-4 z-10 bg-white p-1.5 md:p-2 rounded-full shadow-md text-sm md:text-xl hover:scale-110 transition-transform duration-200"
                >
                  {isInWishlist(product._id) ? "❤️" : "🤍"}
                </button>
                <img src={product.image} alt={product.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>

              <div className="p-3 md:p-5 flex flex-col flex-grow">
                <div className="flex flex-col md:flex-row justify-between items-start mb-1 md:mb-2 gap-1">
                  <h2 className="text-sm md:text-lg lg:text-xl font-bold text-slate-800 line-clamp-1">{product.title}</h2>
                  <span className="bg-slate-900 text-amber-500 text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full">{product.category}</span>
                </div>
                
                <div className="mb-1 md:mb-2">
                  {product.stock > 0 ? (
                    <span className="text-green-700 font-semibold text-[10px] md:text-xs bg-green-100 px-1.5 py-0.5 rounded-md inline-block">In Stock</span>
                  ) : (
                    <span className="text-red-700 font-semibold text-[10px] md:text-xs bg-red-100 px-1.5 py-0.5 rounded-md inline-block">Out of Stock</span>
                  )}
                </div>

                <p className="text-slate-600 text-[10px] md:text-sm mb-2 md:mb-4 flex-grow line-clamp-2 mt-1 md:mt-2 hidden sm:block">{product.description}</p>
                
                <div className="flex flex-col md:flex-row justify-between items-center mt-2 pt-2 md:mt-4 md:pt-4 border-t border-slate-100 gap-2 md:gap-0">
                  <div className="flex flex-row md:flex-col items-center md:items-start gap-2 md:gap-0 w-full md:w-auto justify-center">
                    {product.isDiscounted ? (
                      <>
                        <span className="text-[10px] md:text-sm text-slate-400 line-through font-bold">Rs. {product.price}</span>
                        <span className="text-sm md:text-lg lg:text-xl font-extrabold text-red-600">Rs. {product.discountPrice}</span>
                      </>
                    ) : (
                      <span className="text-sm md:text-lg lg:text-xl font-extrabold text-slate-900">Rs. {product.price}</span>
                    )}
                  </div>
                  
                  <button 
                    disabled={product.stock <= 0}
                    onClick={() => {
                      const productForCart = product.isDiscounted ? { ...product, price: product.discountPrice } : product;
                      addToCart(productForCart);
                      toast.success(`${product.title} added to cart! 🛒`);
                    }}
                    className={`w-full md:w-auto px-2 py-1.5 md:px-4 md:py-2 rounded-md md:rounded-lg text-xs md:text-sm font-bold transition shadow-sm md:shadow-md ${
                      product.stock <= 0 ? "bg-slate-300 text-slate-500 cursor-not-allowed" : "bg-amber-500 text-slate-900 hover:bg-amber-400"
                    }`}
                  >
                    {product.stock <= 0 ? "Out" : "Add"}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Empty State / No Results */}
        {finalProducts.length === 0 && (
          <div className="text-center text-slate-500 mt-10 md:mt-20 p-6 md:p-10 bg-white rounded-2xl border border-slate-100">
            <span className="text-4xl md:text-5xl block mb-4">🔍</span>
            <h3 className="text-xl md:text-2xl font-bold text-slate-800">No matching shoes found</h3>
            <p className="text-slate-500 mt-2 text-sm md:text-base">Try searching for a different keyword or category.</p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="mt-6 bg-slate-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-800 transition text-sm md:text-base"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Products;