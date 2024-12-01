const nodemailer = require('nodemailer');

// Create a transporter object using Gmail SMTP service
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SEND_EMAIL,
        pass: process.env.SEND_EMAIL_PASS,
    },
});

module.exports = transporter;