const nodemailer = require("nodemailer");
require("dotenv").config()

    const transporter = nodemailer.createTransport({
        service: "gmail",
        port:587,
        host:"smtp.gmail.com",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // await transporter.sendMail({
    //     from: process.env.EMAIL_USER,
    //     to,
    //     subject,
    //     html
    // });


module.exports = transporter;