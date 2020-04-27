const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');
const mg = require('nodemailer-mailgun-transport');



const mailgunOptions = {
  auth: {
    api_key: process.env.MAILGUN_ACTIVE_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
}

const getTransport = function(){
  if (process.env.NODE_ENV === 'development') {
    return nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });
  } else {
    return nodemailer.createTransport(mg(mailgunOptions));
  }
}


const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options);
  return html;
}

exports.send = async (options) => {
  const transport = getTransport();
  const html = generateHTML(options.filename,options)
  const text = htmlToText.fromString(html);
  const maiLOptions = {
    from: 'Rory <noreply@rorybot.com>',
    to: options.user.email,
    subject: "Password Reset",
    html,
    text
  };
  const sendMail = promisify(transport.sendMail, transport);
  return sendMail(maiLOptions);
};
