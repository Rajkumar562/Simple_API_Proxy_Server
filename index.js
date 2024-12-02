const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const proxyRoutes = require("./routes/proxyRoutes");
const errorHandler = require("./middlewares/errorHandler");

require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

morgan.token("rate-limit", (req) => req.rateLimitStatus || "not limited");
app.use(morgan(":date[iso] :remote-addr :method :url :status RateLimitStatus=:rate-limit"));

app.use(authRoutes);
app.use(proxyRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API Proxy server is running at http://localhost:${PORT}`);
});
