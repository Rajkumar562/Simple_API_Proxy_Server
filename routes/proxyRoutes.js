const express = require("express");
const { handleProxyRequest } = require("../controllers/proxyController");
const authenticate = require("../middlewares/authMiddleware");
const rateLimiter = require("../middlewares/rateLimiter");

const router = express.Router();

router.get("/proxy", rateLimiter, authenticate, handleProxyRequest);

module.exports = router;
