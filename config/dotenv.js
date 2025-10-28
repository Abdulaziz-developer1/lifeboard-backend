require("dotenv").config();

let config = {
  PORT: process.env.PORT || 3000,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  ADMIN_CLIENT_ORIGIN:
    process.env.ADMIN_CLIENT_ORIGIN || "http://localhost:5173",
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  SALT_LEVEL: Number(process.env.SALT_LEVEL),
};

module.exports = config;
