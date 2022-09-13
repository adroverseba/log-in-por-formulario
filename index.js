const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const asunto = process.argv[2];
const mensaje = process.argv[3];

const accountTransport = require("./config/mail");

const oauth2Client = new OAuth2(
  accountTransport.auth.clientId,
  accountTransport.auth.clientSecret,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: accountTransport.auth.refreshToken,
  tls: {
    rejectUnauthorized: false,
  },
});

//lo siguiente es para solicitar un nuevo token
oauth2Client.getAccessToken((err, token) => {
  if (err) return console.log(err);

  accountTransport.auth.AccesToken = token;
});

const transporter = nodemailer.createTransport(accountTransport);

const mailOptions = {
  from: ' " Hola😊 OAuth2"<adroverseba.dev@gmail.com>',
  to: "adroversebastian.sa@gmail.com",
  subject: asunto,
  html: mensaje,
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log("Error: ", err);
    return;
  }

  console.log(info);
});
