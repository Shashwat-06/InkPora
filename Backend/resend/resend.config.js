import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API);

export const verificationMail = async function (email, token) {
  console.log(email, token);
  const htmlTemplate = `
  <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Verify your InkPora account</title>
    <style>
      body {
        background-color: #f9fafb;
        font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 500px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      }
      .header {
        text-align: center;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
      }
      .header h1 {
        color: #1e1e1e;
        font-size: 22px;
        margin: 0;
      }
      .content {
        text-align: center;
        padding: 20px 0;
      }
      .content p {
        color: #555;
        font-size: 15px;
        line-height: 1.5;
      }
      .token {
        display: inline-block;
        font-size: 20px;
        font-weight: bold;
        color: #111827;
        background: #f3f4f6;
        padding: 10px 20px;
        border-radius: 6px;
        margin: 15px 0;
      }
      .footer {
        text-align: center;
        color: #999;
        font-size: 12px;
        border-top: 1px solid #eee;
        padding-top: 15px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Verify your InkPora Account</h1>
      </div>
      <div class="content">
        <p>Hi there 👋,</p>
        <p>Use the code below to verify your account:</p>
        <div class="token">${token}</div>
        <p>This code will expire in 10 minutes. Please don’t share it with anyone.</p>
      </div>
      <div class="footer">
        <p>© 2025 InkPora. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>`;
  const { data, error } = await resend.emails.send({
    from: "Inkpora <noreply@inkpora.shop>",
    to: `${email}`,
    subject: "Verification Code",
    html: htmlTemplate,
  });

  if (error) {
    console.log(error);
  }

  console.log({ data });
};

export const welcomeEmail = async function (email, name) {
  const htmlTemplate = `
  <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Verify your InkPora account</title>
    <style>
      body {
        background-color: #f9fafb;
        font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 500px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      }
      .header {
        text-align: center;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
      }
      .header h1 {
        color: #1e1e1e;
        font-size: 22px;
        margin: 0;
      }
      .content {
        text-align: center;
        padding: 20px 0;
      }
      .content p {
        color: #555;
        font-size: 15px;
        line-height: 1.5;
      }
      .token {
        display: inline-block;
        font-size: 20px;
        font-weight: bold;
        color: #111827;
        background: #f3f4f6;
        padding: 10px 20px;
        border-radius: 6px;
        margin: 15px 0;
      }
      .footer {
        text-align: center;
        color: #999;
        font-size: 12px;
        border-top: 1px solid #eee;
        padding-top: 15px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Welcome to InkPora</h1>
      </div>
      <div class="content">
        <p>We’re excited to have you onboard 🎉</p>
        <p>Hey there,</p>
        <p>Start exploring our latest arrivals, bestsellers, and limited editions made to inspire every stroke.</p>
      </div>
      <div class="footer">
        <p>© 2025 InkPora. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>`;
  const { data, error } = await resend.emails.send({
    from: "Inkpora <noreply@inkpora.shop>",
    to: `${email}`,
    subject: `Welcome ${name}`,
    html: htmlTemplate,
  });

  if (error) {
    console.log(error);
  }

  console.log({ data });
};
