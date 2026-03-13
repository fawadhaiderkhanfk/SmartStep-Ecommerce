const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); 

// @desc    User schema definition
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String // Optional to accommodate Google OAuth users
    },
    googleId: {
        type: String // Stores Google ID for OAuth users
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user" 
    }
}, { timestamps: true });

// @desc    Compare entered password with the hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    if (!this.password) return false;
    return await bcrypt.compare(enteredPassword, this.password);
};

// @desc    Encrypt password before saving to the database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    
    if (this.password) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
});

module.exports = mongoose.model("User", userSchema);