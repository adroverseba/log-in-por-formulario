require("dotenv").config();

const account_Transport = {
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "adroverseba.dev@gmail.com",
    clientId:
      "1046912142738-t8qgg0uho65tcbgd8n42ipf971uvfqg3.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken:
      "1//04OHkred3i1I3CgYIARAAGAQSNwF-L9IraVTFBhG1rJKpLUVlEXMtGZJl33RFSxlNhxxHssJtu3ZRsBEHbm975oPE8xTcr6c0yHc",
  },
};

module.exports = account_Transport;
