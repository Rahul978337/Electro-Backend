const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Change this from localhost
    port: 465,              // Port 465 is for SSL
    secure: true,           // Must be true for port 465
    auth: {
      user: "grahulsaini1811@gmail.com",
      pass: "mrbd beov vyyu njes", // Your App Password
    },
  });

  const mailOptions = {
    from: "grahulsaini1811@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};


module.exports = sendEmail;