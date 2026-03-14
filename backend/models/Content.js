const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    page: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    sections: {
        type: Map,
        of: mongoose.Schema.Types.Mixed, // flexible for different content structures
        default: {}
    },
    images: {
        type: Map,
        of: String, // URL paths
        default: {}
    }
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);
