import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createEmailTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

export const sendVerificationEmail = async (email) => {
  const transporter = createEmailTransporter();
  const verificationLink = `${
    process.env.FRONTEND_URL
  }/verify-email?token=${generateVerificationToken(email)}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email",
    html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Email Verification</h2>
            <p>Thank you for registering on our Bookstore! Please verify your email by clicking the button below:</p>
            <a href="${verificationLink}" 
               style="display: inline-block; 
                      padding: 10px 20px; 
                      background-color: #4CAF50; 
                      color: white; 
                      text-decoration: none; 
                      border-radius: 5px;">
              Verify Email
            </a>
            <p>This link will expire in 1 hour.</p>
          </div>
        `,
  };

  await transporter.sendMail(mailOptions);
};

export const generateVerificationToken = (userEmail) => {
  return jwt.sign({ userEmail }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};