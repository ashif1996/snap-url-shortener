const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;