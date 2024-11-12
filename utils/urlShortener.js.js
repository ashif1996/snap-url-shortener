const Url = require('../models/urlModel');
const crypto = require('crypto');

const generateShortenedUrl = async (req) => {
    try {
        let uniqueString;
        let shortenedUrl;
        let isUnique = false;

        while (!isUnique) {
            uniqueString = crypto.randomBytes(6).toString('hex');
            shortenedUrl = `${req.protocol}://${req.get('host')}/${uniqueString}`;
            isUnique = !(await Url.findOne({ shortenedUrl }));
        }

        return shortenedUrl;
    } catch (error) {
        console.error('Error generating shortened URL:', error);
        throw new Error('Failed to generate unique shortened URL.');
    }
};

module.exports = generateShortenedUrl;