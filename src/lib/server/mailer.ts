import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  },
});

export const sendEmailVerificationCode = (email: string, code: string, expiresAt: string) =>
  transporter.sendMail({
    from: `Daedalus Dev Team <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Verify your Account',
    html: `

<h2>Your verification code is <span style="background-color: #1d1d1d; color: #fff; padding: 5px"><b>${code}</b></span></h2>
<p>This code will expire at ${expiresAt}.</p>
<p> - <i>Daedalus Dev</i></p>
`
  });
