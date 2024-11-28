const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for storing URL data
const urlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true,
        unique: true,
    },
    shortenedUrl: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
    },
});

urlSchema.index({ originalUrl: 1 });
urlSchema.index({ shortenUrl: 1 });

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;