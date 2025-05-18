const nodemailer = require("nodemailer");
const Subscriber = require("./models/Subscriber");

require("dotenv").config();

const sendNewsletter = async (subject, htmlContent) => {
  try {
    const subscribers = await Subscriber.find();

    const emails = subscribers.map((sub) => sub.email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Your Project Name" <${process.env.EMAIL_USER}>`,
      to: emails,
      subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Newsletter sent successfully!");
  } catch (error) {
    console.error("❌ Error sending newsletter:", error);
  }
};

module.exports = sendNewsletter;
