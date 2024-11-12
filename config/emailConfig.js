const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SEND_EMAIL,
        pass: process.env.SEND_EMAIL_PASS,
    },
    secure: true,
});

module.exports = transport;