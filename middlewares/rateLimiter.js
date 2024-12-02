const rateLimit = require("express-rate-limit");
require("dotenv").config();

const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX),
  handler: (req, res) => {
    req.rateLimitStatus = "rate limited";
    res.status(429).json({ error: "Rate limit exceeded" });
  },
});

module.exports = rateLimiter;
