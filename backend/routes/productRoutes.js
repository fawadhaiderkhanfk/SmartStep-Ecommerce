const express = require("express");
const router = express.Router();
const { createProduct, getProducts, updateProduct } = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Protected route to fetch all products
router.get("/", protect, getProducts);

// Admin-only route to create a new product with image upload
router.post("/", protect, admin, upload.single("image"), createProduct);

// Admin-only route to update an existing product
router.put("/:id", protect, admin, updateProduct);

module.exports = router;