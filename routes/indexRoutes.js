const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');

router.get('/', indexController.getHome);
router.get('/about', indexController.getAbout);
router.get('/contact', indexController.getContact);

router.post('/shorten-url', indexController.shortenUrl);
router.get('/shortened-url', indexController.getShortenedUrl);
router.get('/:shortId', indexController.redirectToOriginalUrl);

router.post('/contact/send-email', indexController.processSendEmail);

module.exports = router;