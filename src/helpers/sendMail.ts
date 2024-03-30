import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import config from '../config';
import ApiError from '../errors/ApiError';
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
  try {
    const template = generateInviteTemplate('foortiawal@gmail.com', 'Awal Ho');
    const mailOptions = {
      from: config.mail.user,
      to,
      subject,
      html: template,
    };

    return transporter.sendMail(mailOptions);
  } catch (error) {
    throw new ApiError(500, 'Error sending email');
  }
};

export default sendMail;
