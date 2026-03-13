const mongoose = require("mongoose");
const dotenv = require("dotenv");
const products = require("./data/products");
const Product = require("./models/Product");
const dns = require("node:dns/promises");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("📦 MongoDB Connected for Seeding"))
  .catch((err) => {
      console.log("❌ DB Connection Error:", err.message);
      process.exit(1); // Exit process with failure
  });

// @desc    Import sample data into the database
const importData = async () => {
    try {
        // Clear existing products to avoid duplicates
        await Product.deleteMany();
        console.log("🧹 Purane products clean ho gaye...");

        // Insert new product data
        await Product.insertMany(products);
        console.log("✅ 30 Naye Products Database mein successfully add ho gaye!");
        
        process.exit(); // Exit process successfully
    } catch (error) {
        console.error("🔴 Error importing data:", error.message);
        process.exit(1);
    }
};

// Execute the seed function
importData();