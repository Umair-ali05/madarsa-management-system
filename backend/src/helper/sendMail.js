import nodemailer from 'nodemailer';
// import sendGridTransport from 'nodemailer-sendgrid-transport';
import { config } from 'dotenv';

config();

const { MAIL, PASSWORD, SERVICE } = process.env;
const signupEmail = async (to, data, subject) => {
  try {
    const transporter = nodemailer.createTransport({
      service: SERVICE,
      auth: {
        user: MAIL,
        pass: PASSWORD,
      },
    });
    const userData = {
      from: MAIL,
      to,
      subject,
      html: `${data}`,
    };
    const done = await transporter.sendMail(userData);
  } catch (error) {
    console.log(error);
  }
};
export default signupEmail;
