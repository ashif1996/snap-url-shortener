const transporter = require('../config/emailConfig');

const SendEmail = (name, email, message) => {
    const mailOptions = {
        from: email,
        to: "faithfuldebates@gmail.com",
        subject: "New Contact Us Message",
        text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    }

    return transporter.sendMail(mailOptions);
};

module.exports = SendEmail;