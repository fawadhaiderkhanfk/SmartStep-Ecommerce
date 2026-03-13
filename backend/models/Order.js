const mongoose = require("mongoose");

// @desc    Order schema definition
const orderSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "User" // Reference to the User who placed the order
    },
    orderItems: [
        {
            title: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
        }
    ],
    paymentMethod: { 
        type: String, 
        required: true, 
        default: "Cash on Delivery" 
    },
    totalPrice: { 
        type: Number, 
        required: true 
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false // Delivery status, updatable by Admin
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);