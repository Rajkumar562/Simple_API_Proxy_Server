const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: Number(process.env.RATE_LIMIT_MAX || 5),
  handler: (req, res) => {
    req.rateLimitStatus = "rate limited";
    res.status(429).json({ error: "Rate limit exceeded" });
  },
});

module.exports = rateLimiter;
