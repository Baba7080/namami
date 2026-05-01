const express = require('express');
const router = express.Router();
const CallLogKey = require('../models/CallLogKey');

// @route   POST api/logs/sync
// @desc    Receive logs from app and forward to API Gateway
router.post('/sync', async (req, res) => {
    try {
        const { logs } = req.body;
        
        if (!logs || !Array.isArray(logs)) {
            return res.status(400).json({ message: 'Invalid logs data' });
        }

        // 1. Fetch API Key from MongoDB
        const keyDoc = await CallLogKey.findOne({ serviceName: 'api-gateway' });
        if (!keyDoc) {
            return res.status(500).json({ message: 'API Key not found in database' });
        }

        const apiKey = keyDoc.apiKey;

        // 2. Forward to API Gateway
        const response = await fetch('https://api-gateway.host.com/api/logs/call', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': apiKey
            },
            body: JSON.stringify({ logs })
        });

        const result = await response.json();

        res.status(response.status).json({
            message: 'Logs processed',
            gatewayResponse: result
        });

    } catch (error) {
        console.error('Log Sync Error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

module.exports = router;
