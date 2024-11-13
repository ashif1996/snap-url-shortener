const transporter = require('../config/emailConfig');

const SendEmail = (name, email, message) => {
    const mailOptions = {
        from: process.env.SEND_EMAIL,
        to: "faithfuldebates@gmail.com",
        subject: "📬 New Message from SnapURL Contact Form",
        text: `
Hello,

You have received a new message through the SnapURL Contact Us form:

----------------------------------------------------
👤 Name: ${name}  
📧 Email: ${email}

💬 Message:

${message}
----------------------------------------------------

Best regards,
SnapURL Notification System
        `,
        replyTo: email,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = SendEmail;