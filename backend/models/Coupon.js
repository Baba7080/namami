const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    discountPercentage: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    name: String,
    phone: String,
    instagramId: String
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);
