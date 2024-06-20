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

export const sendEmailVerificationCode = (email: string, code: string) =>
  transporter.sendMail({
    from: `Daedalus Dev Team <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Login Code',
    html: `

<h2>Your login code is <span style="background-color: #1d1d1d; color: #fff; padding: 5px"><b>${code}</b></span></h2>

<p> - <i>Daedalues Dev</i></p>
`
  });
