const crypto = require('crypto');
const Url = require('../models/urlModel');

// Function to generate a unique shortened URL
const generateShortenedUrl = async (req) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        let uniqueString;
        let shortenedUrl;
        let isUnique = false;

        while (!isUnique) {
            uniqueString = crypto.randomBytes(6).toString('hex');
            shortenedUrl = `${baseUrl}/${uniqueString}`;
            isUnique = !(await Url.exists({ shortenedUrl }));
        }

        return shortenedUrl;
    } catch (error) {
        console.error('Error generating shortened URL:', error);
        throw new Error('Failed to generate unique shortened URL.');
    }
};

module.exports = generateShortenedUrl;