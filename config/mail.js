require("dotenv").config();

const account_Transport = {
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "adroverseba.dev@gmail.com",
    clientId: process.env.MAIL_CLIENTID,
    clientSecret: process.env.MAIL_CLIENTSECRET,
    refreshToken: process.env.MAIL_REFRESHTOKEN,
  },
};

module.exports = account_Transport;
