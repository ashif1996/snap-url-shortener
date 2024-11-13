const Url = require('../models/urlModel');
const HttpStatusCodes = require('../utils/httpStatusCodes.js');
const generateShortenedUrl = require('../utils/urlShortener.js');
const sendEmail = require('../utils/emailUtils');

const getHome = (req, res) => {
    const locals = { title: "Home | SnapURL!" };
    return res.status(HttpStatusCodes.OK).render("index", {
        locals,
        layout: "layout/mainLayout",
    });
};

const getAbout = (req, res) => {
    const locals = { title: "About Us | SnapURL!" };
    return res.status(HttpStatusCodes.OK).render("about", {
        locals,
        layout: "layout/mainLayout",
    });
};

const getContact = (req, res) => {
    const locals = { title: "Contact Us | SnapURL!" };
    return res.status(HttpStatusCodes.OK).render("contact", {
        locals,
        layout: "layout/mainLayout",
    });
};

const shortenUrl = async (req, res) => {
    const { originalUrl } = req.body;

    try {
        const existingUrl = await Url.findOne({ originalUrl });
        if (existingUrl) {
            req.session.shortenedUrl = existingUrl.shortenedUrl;

            return res.status(HttpStatusCodes.OK).json({
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

        req.session.shortenedUrl = shortenedUrl;

        return res.status(HttpStatusCodes.CREATED).json({
            success: true,
            message: 'URL successfully shortened. Click OK button to see the shortened URL.',
            shortenedUrl,
        });
    } catch (error) {
        console.error('Error shortening the URL:', error);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error. Please try again later.',
        });
    }
};

const getShortenedUrl = (req, res) => {
    const shortenedUrl = req.session.shortenedUrl;

    const locals = {
        title: "Shortened Url | SnapURL!",
        shortenedUrl: shortenedUrl ? shortenedUrl : null,
    };

    return res.status(HttpStatusCodes.OK).render("result", {
        locals,
        layout: "layout/mainLayout",
    });
};

const redirectToOriginalUrl = async (req, res) => {
    const { shortId } = req.params;

    try {
        const shortenedurl = await Url.findOne({ shortenedUrl: `${req.protocol}://${req.get('host')}/${shortId}` });

        if (shortenedurl) {
            return res.redirect(HttpStatusCodes.MOVED_PERMANENTLY, shortenedurl.originalUrl);
        }
    } catch (error) {
        console.error('Error during URL redirection:', error);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server error. Please try again.');
    }
};

const processSendEmail = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        await sendEmail(name, email, message);

        return res.status(HttpStatusCodes.OK).json({
            success: true,
            message: "Email sent successfully!",
        })
    } catch (error) {
        console.error("Failed to send email:", error);

        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Failed to send email.',
        });
    }
};

module.exports ={
    getHome,
    getAbout,
    getContact,
    shortenUrl,
    getShortenedUrl,
    redirectToOriginalUrl,
    processSendEmail,
};