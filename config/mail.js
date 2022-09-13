require("dotenv").config();

const account_Transport = {
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USER,
    clientId: process.env.MAIL_CLIENTID,
    clientSecret: process.env.MAIL_CLIENTSECRET,
    refreshToken: process.env.MAIL_REFRESHTOKEN,
  },
};

module.exports = account_Transport;
