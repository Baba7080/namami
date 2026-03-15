const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from 'public' (For local image uploads)
app.use(express.static(path.join(__dirname, 'public')));

// Admin & CMS Routes
app.use('/api/admin', adminRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('Namami Gaiya API is running...');
});

// Products API Setup
app.get('/api/products', (req, res) => {
    // Mock product data
    const products = [
        { id: 1, name: 'Interior Eco Paint', description: 'Smooth finish for homes and offices', category: 'Paint', price: 250, imgUrl: 'https://namamigaiya.com/static/media/pro1.d16812839b2cd48c4ae8.jpg' },
        { id: 2, name: 'Exterior Eco Paint', description: 'Weather-resistant natural paint', category: 'Paint', price: 280, imgUrl: 'https://namamigaiya.com/static/media/pro3.32dbfa31f9d50ad75db2.png' },
        { id: 3, name: 'Distemper', description: 'Economical and breathable wall finish', category: 'Paint', price: 150, imgUrl: 'https://namamigaiya.com/static/media/pro2.53503a73c0f209700329.png' },
        { id: 4, name: 'Primer & Base Coats', description: 'For better adhesion and durability', category: 'Primer', price: 200, imgUrl: 'https://namamigaiya.com/static/media/pro1.d16812839b2cd48c4ae8.jpg' }
    ];
    res.json(products);
});

// Handle enquiries
app.post('/api/enquiry', (req, res) => {
    const { name, email, phone, message, type } = req.body;
    console.log(`New Enquiry [${type}]:`, { name, email, phone, message });
    res.json({ success: true, message: 'Enquiry received successfully.' });
});

// Handle orders
app.post('/api/orders', (req, res) => {
    const { orderItems, total, customerInfo } = req.body;
    console.log('New Order:', { customerInfo, total, itemsCount: orderItems?.length });
    res.json({
        success: true,
        message: 'Order placed successfully.',
        orderId: 'ORD-' + Math.floor(Math.random() * 100000)
    });
});

const Coupon = require('./models/Coupon');

// Handle coupon validation
app.post('/api/coupons/validate', async (req, res) => {
    try {
        const { code } = req.body;
        const coupon = await Coupon.findOne({ code, isActive: { $ne: false } });
        
        if (coupon) {
            res.json({ success: true, valid: true, discountPercentage: coupon.discountPercentage });
        } else {
            res.json({ success: false, valid: false, message: 'Invalid or expired promo code.' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error validating coupon.' });
    }
});

// Handle public influencer/user registration for a coupon
app.post('/api/influencer/register', async (req, res) => {
    try {
        const { name, phone, instagramId } = req.body;
        if (!name || !phone) {
            return res.status(400).json({ success: false, message: 'Name and Phone number are required.' });
        }

        // Check if phone number already registered
        const existing = await Coupon.findOne({ phone });
        if (existing) {
            return res.status(400).json({ success: false, message: 'A coupon has already been generated for this phone number.', code: existing.code });
        }

        // Generate a random 6-character code (uppercase letters and numbers)
        const generateCode = () => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let result = '';
            for (let i = 0; i < 6; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        };

        let newCode = generateCode();
        while (await Coupon.findOne({ code: newCode })) {
            newCode = generateCode(); // ensure uniqueness
        }

        const newCoupon = await Coupon.create({
            code: newCode,
            discountPercentage: 10, // Default discount for public signups
            isActive: true,
            name,
            phone,
            instagramId: instagramId || ''
        });

        res.json({ success: true, code: newCode, discountPercentage: 10 });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error generating coupon.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
