const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
// Adding Vercel URL to the allowed origins
app.use(cors({
    origin: [
        "http://localhost:5173", 
        "https://smart-step-ecommerce-l0kr75ek7-fawadhaiderkhanfks-projects.vercel.app",
        "https://smart-step-ecommerce.vercel.app"
    ], 
    credentials: true
}));

app.use(express.json());

// Basic route to test if server is running
app.get("/", (req, res) => {
    res.send("Smartstep API is running...");
});

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes")); 

const PORT = process.env.PORT || 5000;

// Vercel handles the port, but this is good for local testing
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;