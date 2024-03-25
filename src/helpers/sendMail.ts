import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import config from '../config';
import { generateInviteTemplate } from './emailTemplate';

const smtpConfig: SMTPTransport.Options = {
  host: config.mail.host,
  port: Number(config.mail.port),
  secure: false,
  auth: {
    user: config.mail.user,
    pass: config.mail.pass,
  },
};

const transporter = nodemailer.createTransport(smtpConfig);

const sendMail = async (to: string, subject: string) => {
  const template = generateInviteTemplate('foortiawal@gmail.com', 'Awal Ho');
  const mailOptions = {
    from: config.mail.user,
    to,
    subject,
    html: template,
  };

  return transporter.sendMail(mailOptions);
};

export default sendMail;
