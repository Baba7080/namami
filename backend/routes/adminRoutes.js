const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const DATA_FILE = path.join(__dirname, '../data.json');

// Helper to read data
const readData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return {};
    }
};

// Helper to write data
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// --- AUTHENTICATION ---
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Hardcoded for simplicity as requested
    if (username === 'admin' && password === 'namami123') {
        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });
        res.json({ success: true, token });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
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
router.get('/content/:page', (req, res) => {
    try {
        const allData = readData();
        const pageContent = allData[req.params.page] || null;

        if (!pageContent) return res.status(404).json({ success: false, message: 'Page content not found' });
        res.json({ success: true, data: pageContent });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update or create content for a page (Protected)
router.put('/content/:page', verifyAdmin, (req, res) => {
    try {
        const { title, sections, images } = req.body;
        const page = req.params.page;

        const allData = readData();

        // Update the specific page
        allData[page] = {
            page: page,
            title: title || (allData[page] ? allData[page].title : ''),
            sections: sections || {},
            images: images || {},
            updatedAt: new Date().toISOString()
        };

        writeData(allData);

        res.json({ success: true, data: allData[page] });
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
router.get('/coupons', verifyAdmin, (req, res) => {
    try {
        const allData = readData();
        const coupons = allData.coupons || [];
        res.json({ success: true, data: coupons });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Create new coupon
router.post('/coupons', verifyAdmin, (req, res) => {
    try {
        const { code, discountPercentage, isActive } = req.body;
        const allData = readData();
        const coupons = allData.coupons || [];

        // check if exists
        if (coupons.find(c => c.code === code)) {
            return res.status(400).json({ success: false, message: 'Coupon code already exists' });
        }

        const newCoupon = {
            id: Date.now().toString(),
            code,
            discountPercentage: Number(discountPercentage),
            isActive: isActive !== undefined ? isActive : true,
            createdAt: new Date().toISOString()
        };

        coupons.push(newCoupon);
        allData.coupons = coupons;
        writeData(allData);

        res.json({ success: true, data: newCoupon });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update coupon
router.put('/coupons/:id', verifyAdmin, (req, res) => {
    try {
        const { id } = req.params;
        const { code, discountPercentage, isActive } = req.body;
        const allData = readData();
        const coupons = allData.coupons || [];

        const index = coupons.findIndex(c => c.id === id);
        if (index === -1) return res.status(404).json({ success: false, message: 'Coupon not found' });

        coupons[index] = {
            ...coupons[index],
            code: code !== undefined ? code : coupons[index].code,
            discountPercentage: discountPercentage !== undefined ? Number(discountPercentage) : coupons[index].discountPercentage,
            isActive: isActive !== undefined ? isActive : coupons[index].isActive,
            updatedAt: new Date().toISOString()
        };

        allData.coupons = coupons;
        writeData(allData);

        res.json({ success: true, data: coupons[index] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete coupon
router.delete('/coupons/:id', verifyAdmin, (req, res) => {
    try {
        const { id } = req.params;
        const allData = readData();
        const coupons = allData.coupons || [];

        const filtered = coupons.filter(c => c.id !== id);
        if (filtered.length === coupons.length) {
            return res.status(404).json({ success: false, message: 'Coupon not found' });
        }

        allData.coupons = filtered;
        writeData(allData);

        res.json({ success: true, message: 'Coupon deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
