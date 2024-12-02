const { generateToken } = require("../services/tokenService");

const login = (req, res) => {
  const ip = req.ip;
  const token = generateToken(ip);

  // console.log(token," at login");
  res.cookie("authToken", token);
  res.status(200).json({ message: "Login successful", token });
};

module.exports = { login };
