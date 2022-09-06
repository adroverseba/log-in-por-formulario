require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "dev",
  isProd: process.env.NODE_ENV === "production",
  port: process.env.PORT || 8080,
  dbUser: process.env.DB_USER || "postgres",
  dbPassword: process.env.DB_PASSWORD || "battousaiseba",
  dbHost: process.env.DB_HOST || "localhost",
  dbName: process.env.DB_NAME || "eCommerce",
  dbPort: process.env.DB_PORT || "5432",
  dbUrl: process.env.DATABASE_URL,
};

module.exports = { config };
