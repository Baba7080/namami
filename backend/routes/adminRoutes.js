const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const Content = require('../models/Content');
const Coupon = require('../models/Coupon');
const UserAdmin = require('../models/UserAdmin');

// --- AUTHENTICATION ---
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await UserAdmin.findOne({ username });
        
        if (admin && await admin.comparePassword(password)) {
            const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });
            res.json({ success: true, token });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Login error' });
    }
});

// Middleware to verify token
const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET || 'secretkey', (err, decoded) => {
        if (err || decoded.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }
        next();
    });
};

// --- CONTENT MANAGEMENT ---

// Get content for a specific page
router.get('/content/:page', async (req, res) => {
    try {
        const pageContent = await Content.findOne({ page: req.params.page });
        if (!pageContent) return res.status(404).json({ success: false, message: 'Page content not found' });
        res.json({ success: true, data: pageContent });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update or create content for a page (Protected)
router.put('/content/:page', verifyAdmin, async (req, res) => {
    try {
        const { title, sections, images } = req.body;
        const page = req.params.page;

        const updatedContent = await Content.findOneAndUpdate(
            { page },
            { title, sections, images },
            { upsert: true, new: true }
        );

        res.json({ success: true, data: updatedContent });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// --- IMAGE UPLOAD ---

// Set up Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Upload Endpoint (Protected)
router.post('/upload', verifyAdmin, upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    // Return the URL path to the frontend
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ success: true, imageUrl });
});

// --- COUPON MANAGEMENT ---

// Get all coupons
router.get('/coupons', verifyAdmin, async (req, res) => {
    try {
        const coupons = await Coupon.find().sort({ createdAt: -1 });
        res.json({ success: true, data: coupons });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Create new coupon
router.post('/coupons', verifyAdmin, async (req, res) => {
    try {
        const { code, discountPercentage, isActive } = req.body;
        
        // check if exists
        const existing = await Coupon.findOne({ code });
        if (existing) {
            return res.status(400).json({ success: false, message: 'Coupon code already exists' });
        }

        const newCoupon = await Coupon.create({
            code,
            discountPercentage: Number(discountPercentage),
            isActive: isActive !== undefined ? isActive : true
        });

        res.json({ success: true, data: newCoupon });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update coupon
router.put('/coupons/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { code, discountPercentage, isActive } = req.body;

        const updatedCoupon = await Coupon.findByIdAndUpdate(id, {
            code,
            discountPercentage: discountPercentage !== undefined ? Number(discountPercentage) : undefined,
            isActive
        }, { new: true });

        if (!updatedCoupon) return res.status(404).json({ success: false, message: 'Coupon not found' });

        res.json({ success: true, data: updatedCoupon });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete coupon
router.delete('/coupons/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCoupon = await Coupon.findByIdAndDelete(id);
        
        if (!deletedCoupon) {
            return res.status(404).json({ success: false, message: 'Coupon not found' });
        }

        res.json({ success: true, message: 'Coupon deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
