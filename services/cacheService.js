const NodeCache = require("node-cache");
require("dotenv").config();

const cache = new NodeCache({ stdTTL: Number(process.env.CACHE_DURATION) });

const getCachedResponse = (key) => cache.get(key);
const setCacheResponse = (key, value) => cache.set(key, value);

module.exports = {
  getCachedResponse,
  setCacheResponse,
};
