const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');

router.get('/', indexController.getHome);
router.get('/about', indexController.getAbout);
router.get('/contact', indexController.getContact);
router.get('/shortened-url', indexController.getShortenedUrl);

module.exports = router;