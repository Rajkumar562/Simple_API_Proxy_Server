const { validateToken } = require("../services/tokenService");

const authenticate = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(403).json({ error: "Unauthorized: No token provided" });
  }

  try {
    // console.log(token, " at Validation");
    const decoded = validateToken(token);
    if (decoded.ip !== req.ip) {
      return res.status(403).json({ error: "Unauthorized: IP mismatch" });
    }
    next();
  } catch (err) {
    res.status(403).json({ error: "Unauthorized: " + err.message });
  }
};

module.exports = authenticate;
