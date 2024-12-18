import express from "express";
const router = express.Router();

import indexController from "../controllers/indexController.js";

router.get('/', indexController.getHome);
router.get('/about', indexController.getAbout);
router.get('/contact', indexController.getContact);

router.post('/shorten-url', indexController.shortenUrl);
router.get('/shortened-url', indexController.getShortenedUrl);
router.get('/:shortId', indexController.redirectToOriginalUrl);

router.post('/contact/send-email', indexController.emailLimiter, indexController.processSendEmail);

export default router;