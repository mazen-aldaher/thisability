import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, htmlContent) => {
  // Configure the email transport
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  // Set email options
  const mailOptions = {
    from: '"Thisability" <noreply@thisability.com>', // Sender address
    to, // Recipient's email
    subject, // Subject line
    html: htmlContent, // HTML body
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};
