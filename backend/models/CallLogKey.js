const mongoose = require('mongoose');

const callLogKeySchema = new mongoose.Schema({
    apiKey: {
        type: String,
        required: true
    },
    serviceName: {
        type: String,
        default: 'api-gateway'
    }
}, { timestamps: true });

module.exports = mongoose.model('CallLogKey', callLogKeySchema, 'call_log_key');
