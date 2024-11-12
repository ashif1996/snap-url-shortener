const Url = require('../models/urlModel');
const generateShortenedUrl = require('../utils/urlShortener.js');

const getHome = (req, res) => {
    const locals = { title: "Home | SnapURL!" };
    return res.render("index", {
        locals,
        layout: "layout/mainLayout",
    });
};

const getAbout = (req, res) => {
    const locals = { title: "About Us | SnapURL!" };
    return res.render("about", {
        locals,
        layout: "layout/mainLayout",
    });
};

const getContact = (req, res) => {
    const locals = { title: "Contact Us | SnapURL!" };
    return res.render("contact", {
        locals,
        layout: "layout/mainLayout",
    });
};

const shortenUrl = async (req, res) => {
    const { originalUrl } = req.body;

    try {
        const existingUrl = await Url.findOne({ originalUrl });
        if (existingUrl) {
            return res.status(200).json({
                success: true,
                message: 'The URL you provided is already shortened. Click OK button to see the shortened URL.',
                shortenedUrl: existingUrl.shortenedUrl,
            });
        }

        const shortenedUrl = await generateShortenedUrl(req);

        const newShortenedUrl = new Url({
            originalUrl,
            shortenedUrl,
            createdAt: new Date(),
            expiresAt: null,
        });

        await newShortenedUrl.save();

        return res.status(201).json({
            success: true,
            message: 'URL successfully shortened. Click OK button to see the shortened URL.',
            shortenedUrl,
        });
    } catch (error) {
        console.error('Error shortening the URL:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.',
        });
    }
};

const getShortenedUrl = (req, res) => {
    const locals = { title: "Shortened Url | SnapURL!" };
    return res.render("result", {
        locals,
        layout: "layout/mainLayout",
    });
};

module.exports ={
    getHome,
    shortenUrl,
    getAbout,
    getContact,
    getShortenedUrl,
};