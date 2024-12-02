const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET;

const generateToken = (ip) => {
  return jwt.sign({ ip }, SECRET_KEY, { expiresIn: "1h" });
};

const validateToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = { generateToken, validateToken };
