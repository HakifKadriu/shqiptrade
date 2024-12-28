export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: black; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Shqip Trade</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Shqip Trade</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Shqip Trade</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const WELCOME_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ShqipTrade</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      color: black;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #0056b3;
      color: #ffffff;
      text-align: center;
      padding: 20px 10px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px 15px;
      color: #333333;
    }
    .content h2 {
      color: #0056b3;
      font-size: 22px;
      margin-bottom: 10px;
    }
    .content p {
      line-height: 1.6;
      margin: 10px 0;
    }
    .cta {
      text-align: center;
      margin: 20px 0;
    }
    .cta a {
      display: inline-block;
      padding: 12px 20px;
      background-color: #0056b3;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
    }
    .cta a:hover {
      background-color: #003f7f;
    }
    .footer {
      background-color: #f4f4f4;
      text-align: center;
      padding: 10px 15px;
      font-size: 14px;
      color: #777777;
    }
    .footer a {
      color: #0056b3;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header Section -->
    <div class="header">
      <h1>Welcome to ShqipTrade!</h1>
    </div>

    <!-- Content Section -->
    <div class="content">
      <h2>Hi {username},</h2>
      <p>We're thrilled to have you on board! 🎉</p>
      <p>At <strong>ShqipTrade</strong>, we connect businesses with customers, making it simple to discover, shop, and trade with ease. Whether you're here to explore amazing products or start selling your own, you're part of a community that values quality, trust, and innovation.</p>
      <h3>Here's what you can do next:</h3>
      <ul>
        <li><strong>Browse Products:</strong> Discover a variety of items tailored to your needs.</li>
        <li><strong>Set Up Your Profile:</strong> Personalize your account for a better experience.</li>
        <li><strong>Stay Updated:</strong> Look out for exclusive deals and updates!</li>
      </ul>
      <p>If you ever need assistance, don't hesitate to reach out to us at <a href="mailto:support@shqiptrade.com">hakifkadriug@gmail.com</a>. We're here to help!</p>
      <div class="cta">
        <a href="https://altinsyla.github.io/InternNexus/">Visit ShqipTrade Now</a>
      </div>
    </div>

    <!-- Footer Section -->
    <div class="footer">
      <p>Connect with us:</p>
      <p>
        <a href="https://www.facebook.com/hakiffkadriuu/">Facebook</a> | 
        <a href="https://www.instagram.com/hakiffkadriuu/">Instagram</a> | 
        <a href="https://x.com/justkifa">Twitter</a>
        <a href="https://www.linkedin.com/in/hakif-kadriu-97166333b/">LinkedIn</a>
      </p>
      <p>Have questions? Visit our <a href="https://altinsyla.github.io/InternNexus/">Help Center</a> or email us at <a href="mailto:support@shqiptrade.com">hakifkadriug@gmail.com</a>.</p>
      <p>© 2024 ShqipTrade. All rights reserved.</p>
    </div>
  </div>
</body>
</html>

`;
