const Order = require("../models/Order");
const Product = require("../models/Product");

// @desc    Create new order & update inventory
// @route   POST /api/orders
// @access  Private
exports.addOrderItems = async (req, res) => {
    try {
        const { orderItems, paymentMethod, totalPrice } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: "No order items found" });
        }

        const order = new Order({
            user: req.user._id,
            orderItems,
            paymentMethod,
            totalPrice
        });

        const createdOrder = await order.save();

        // Update inventory stock for each ordered item
        for (const item of orderItems) {
            const productId = item.product || item._id || item.id; 
            
            const product = await Product.findById(productId);
            
            if (product) {
                product.stock = product.stock - Number(item.qty);
                
                // Prevent negative stock values
                if (product.stock < 0) {
                    product.stock = 0;
                }
                
                await product.save();
            } else {
                console.error(`Product ID ${productId} not found during stock update.`);
            }
        }

        res.status(201).json(createdOrder);
    } catch (error) {
        console.error("Order Creation Error:", error);
        res.status(500).json({ message: "Server Error creating order" });
    }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        console.error("Fetch Orders Error:", error);
        res.status(500).json({ message: "Server Error fetching your history" });
    }
};