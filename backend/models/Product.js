const mongoose = require("mongoose");

// @desc    Product schema definition
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // Cloudinary image URL
    category: { 
        type: String, 
        required: true,
        enum: ["Men", "Ladies", "Kids"] 
    },
    stock: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    isDiscounted: { 
        type: Boolean, 
        required: true, 
        default: false 
    },
    discountPrice: { 
        type: Number, 
        default: 0 // Sale price if isDiscounted is true
    },
    countInStock: { type: Number, required: true, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);