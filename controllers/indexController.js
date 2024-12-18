// Rate limit
import rateLimit from "express-rate-limit";

// Model
import Url from "../models/urlModel.js";

// Helpers
import httpStatusCodes from "../utils/httpStatusCodes.js";
import sendResponse from "../utils/responseUtils.js";
import generateShortenedUrl from "../utils/urlShortener.js";
import sendEmail from "../utils/emailUtils.js";

// Renders the home page
const getHome = (req, res) => {
    const locals = { title: "Home | SnapURL!" };
    return res.status(httpStatusCodes.OK).render("index", {
        locals,
        layout: "layout/mainLayout",
    });
};

// Renders the about page
const getAbout = (req, res) => {
    const locals = { title: "About Us | SnapURL!" };
    return res.status(httpStatusCodes.OK).render("about", {
        locals,
        layout: "layout/mainLayout",
    });
};

// Renders the contact page
const getContact = (req, res) => {
    const locals = { title: "Contact Us | SnapURL!" };
    return res.status(httpStatusCodes.OK).render("contact", {
        locals,
        layout: "layout/mainLayout",
    });
};

// Shortens the provided URL and saves it in the database
const shortenUrl = async (req, res) => {
    const { originalUrl } = req.body;

    try {
        const existingUrl = await Url.findOne({ originalUrl })
            .select("originalUrl shortenedUrl")
            .lean();

        if (existingUrl) {
            if (req.session.shortenedUrl !== existingUrl.shortenedUrl) {
                req.session.shortenedUrl = existingUrl.shortenedUrl;
            }

            return sendResponse(res, {
                statusCode: httpStatusCodes.OK,
                success: true,
                message: "The URL you provided is already shortened. Click OK button to see the shortened URL.",
            });
        }

        const shortenedUrl = await generateShortenedUrl(req);

        await Url.create({
            originalUrl,
            shortenedUrl,
            createdAt: new Date(),
            expiresAt: null,
        });

        req.session.shortenedUrl = shortenedUrl;

        return sendResponse(res, {
            statusCode: httpStatusCodes.CREATED,
            success: true,
            message: "URL successfully shortened. Click OK button to see the shortened URL.",
        });
    } catch (error) {
        console.error("Error shortening the URL:", error);

        return sendResponse(res, {
            statusCode: httpStatusCodes.INTERNAL_SERVER_ERROR,
            message: "An error occurred. Please try again later.",
        });
    }
};

// Renders the shortened URL result page
const getShortenedUrl = (req, res) => {
    const shortenedUrl = req.session.shortenedUrl;

    const locals = {
        title: "Shortened Url | SnapURL!",
        shortenedUrl: shortenedUrl ? shortenedUrl : null,
    };

    return res.status(httpStatusCodes.OK).render("result", {
        locals,
        layout: "layout/mainLayout",
    });
};

// Redirects to the original URL based on the shortened URL ID
const redirectToOriginalUrl = async (req, res) => {
    const { shortId } = req.params;

    try {
        const shortenedurl = await Url.findOne({ shortenedUrl: `${req.protocol}://${req.get('host')}/${shortId}` })
            .select("originalUrl")
            .lean();

        if (shortenedurl) {
            return res.status(httpStatusCodes.MOVED_PERMANENTLY).redirect(shortenedurl.originalUrl);
        }
    } catch (error) {
        console.error("Error during URL redirection:", error);
        throw new Error("An error occured during URL redirection");
    }
};

// Rate limiting to prevent abuse of the contact form
const emailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many requests from this IP, please try again later.",
});

// Handles sending an email through the contact form
const processSendEmail = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        await sendEmail(name, email, message);

        return sendResponse(res, {
            statusCode: httpStatusCodes.OK,
            success: true,
            message: "Email sent successfully.",
        });
    } catch (error) {
        console.error("Failed to send email:", error);

        return sendResponse(res, {
            statusCode: httpStatusCodes.INTERNAL_SERVER_ERROR,
            message: "An error occurred. Please try again later.",
        });
    }
};

export default {
    getHome,
    getAbout,
    getContact,
    shortenUrl,
    getShortenedUrl,
    redirectToOriginalUrl,
    processSendEmail,
    emailLimiter,
};