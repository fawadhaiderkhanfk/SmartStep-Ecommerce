const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");

// Load environment variables (just in case)
dotenv.config();

// @desc    Configure Cloudinary credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @desc    Configure Multer to store files directly in Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "smartstep_products",
        allowed_formats: ["jpg", "jpeg", "png", "webp"], 
    },
});

const upload = multer({ storage });

module.exports = upload;