const Product = require("../models/Product");

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
    try {
        const { title, description, price, category, stock, isDiscounted, discountPrice } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Please upload an image" });
        }

        // With the new Cloudinary middleware, req.file.path is directly the secure Cloudinary URL
        const imageUrl = req.file.path;

        const product = await Product.create({
            title,
            description,
            price,
            category,
            stock, 
            isDiscounted: isDiscounted === 'true' || isDiscounted === true, 
            discountPrice: discountPrice || 0, 
            image: imageUrl, // Directly saving the Cloudinary URL to the database
        });

        res.status(201).json(product);
    } catch (error) {
        console.error("Product Creation Error:", error);
        res.status(500).json({ message: "Server Error creating product", error: error.message });
    }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Private (Logged in users only)
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error fetching products" });
    }
};

// @desc    Update stock and discount of a product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
    try {
        const { stock, isDiscounted, discountPrice } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            product.stock = stock;
            product.isDiscounted = isDiscounted === 'true' || isDiscounted === true;
            product.discountPrice = discountPrice || 0;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Error updating product" });
    }
};