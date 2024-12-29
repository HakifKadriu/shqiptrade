import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_TEMPLATE,
} from "./emailTemplates.js";
dotenv.config();

// send Email by passing to,subject and htmlcontent
const sendEmail = async (to, subject, htmlContent) => {
  try {
    const client = SibApiV3Sdk.ApiClient.instance;
    client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

    const transactionalEmailsApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const emailData = {
      sender: {
        email: "hakifkadriup@gmail.com",
        name: "ShqipTrade",
      },
      to: [{ email: to }],
      subject: subject,
      htmlContent: htmlContent,
      headers: {
        "List-Unsubscribe": "<mailto:hakifkadriup@gmail.com>",
      },
    };

    const response = await transactionalEmailsApi.sendTransacEmail(emailData);
    console.log("email sent successfully to: ", to);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

export const sendVerificationEmail = async (to, verificationcode) => {
  const subject = "ShqipTrade - Verify Your Email";
  const message = VERIFICATION_EMAIL_TEMPLATE.replace(
    "{verificationCode}",
    verificationcode
  );

  try {
    await sendEmail(to, subject, message);
  } catch (error) {
    console.log("Error sending email:", error.message);
  }
};

export const sendWelcomeEmail = async (to, username) => {
  const subject = "Welcome to ShqipTrade! 🌟";
  const message = WELCOME_TEMPLATE.replace("{username}", username);

  try {
    await sendEmail(to, subject, message);
  } catch (error) {
    console.log("Error sending email:", error.message);
  }
};

export const sendResetPasswordEmail = async (to, username, resetTokenUrl) => {
  const subject = "ShqipTrade - Reset Your Password";
  const message = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
    "{resetURL}",
    resetTokenUrl
  );
  try {
    await sendEmail(to, subject, message);
  } catch (error) {
    console.log("Error sending email:", error.message);
  }
};

export const sendResetPasswordSuccessEmail = async (to, username) => {
  const subject = "ShqipTrade - Password Successfully Reset";
  const message = PASSWORD_RESET_SUCCESS_TEMPLATE.replace(
    "{username}",
    username
  );

  try {
    await sendEmail(to, subject, message);
  } catch (error) {
    console.log("Error sending email:", error.message);
  }
};
