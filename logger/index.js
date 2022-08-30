const devLogger = require("./devLogger");
const productionLogger = require("./productionLogger");
const { config } = require("../config/config");

let logger = null;

if (config.env === "dev") {
  logger = devLogger();
}

if (config.env === "production") {
  logger = productionLogger();
}

module.exports = logger;
