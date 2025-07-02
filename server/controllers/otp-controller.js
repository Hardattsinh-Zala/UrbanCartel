const Otp = require("../db_models/otp_model");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const generateOtp = () => crypto.randomInt(100000, 999999);

const generator = async (req, res, next) => {
    try {
        const { email } = req.body;
        const otp = generateOtp();
        await Otp.create({
            email,
            otp
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Your Otp code",
            html: `
                <!DOCTYPE html>
                    <html lang="en">
                        <head>
                        <meta charset="UTF-8" />
                        <style>
                    body {
                        font-family: 'Segoe UI', sans-serif;
                        background-color: #121212;
                        color: #e0e0e0;
                        padding: 0;
                        margin: 0;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 2rem auto;
                        background-color: #1e1e1e;
                        padding: 2rem;
                        border-radius: 10px;
                        box-shadow: 0 2px 10px rgba(255, 255, 255, 0.05);
                    }
                    .message {
                        font-size: 1rem;
                        margin: 1.5rem 0;
                        line-height: 1.6;
                        color: #cccccc;
                    }
                    .highlight {
                    color: #a093ff;
                    font-weight: 500;
                    }
                    .footer {
                    font-size: 0.85rem;
                    color: #888;
                    text-align: center;
                    margin-top: 2rem;
                    border-top: 1px solid #333;
                    padding-top: 1rem;
                    }
                    a {
                    color: #a093ff;
                    text-decoration: none;
                    }
                    </style>
                    </head>
                    <body>
                <div class="email-container">

                    <div class="message">
                    <p>Hi there,</p>
                    <p>Your otp code is <span class="highlight">${otp}</span>.</p>
                    <p>Your code is valid for 5 minutes. Please do not share this code with anyone. If you didn't request this, ignore this message.</p>
                    <p>We value your time and thank you for your interest!</p>
                    <p>Warm regards,<br/>
                    <strong>The Urban Cartel Team</strong></p>
                    </div>

                    <div class="footer">
                    This is an automated email. Please do not reply.<br/>
                    &copy; 2025 Code & Cosmos. All rights reserved.
                    </div>
                </div>
                </body>
                </html>`
        });
        res.status(201).json({msg: "Otp sent!"});
    
    } catch (error) {
        next({message: "Otp generation failed."});
    }
};

const verifyOtp = async (req, res, next) => {
    try {
        const {email, otp} = req.body;
        const record = await Otp.findOne({email});

        if(!record || record.otp !== otp || record.expireAt < Date.now()) {
            return res.status(400).json({msg: "Invalid or expired OTP"});
        }

        await Otp.deleteOne({email});
        res.status(200).json({msg: "Account created successfully"});
    } catch (error) {
        next(error);
    }
}

module.exports = {generator, verifyOtp}