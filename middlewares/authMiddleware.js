const API_KEY = process.env.API_KEY || "key";

const authenticate = (req, res, next) => {
  const clientApiKey = req.header("X-API-KEY");
  if (clientApiKey === API_KEY) {
    next();
  } else {
    req.rateLimitStatus = "unauthorized";
    res.status(403).json({ error: "Unauthorized. Invalid API key." });
  }
};

module.exports = authenticate;
