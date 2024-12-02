const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: Number(process.env.CACHE_DURATION || 300) });

const getCachedResponse = (key) => cache.get(key);
const setCacheResponse = (key, value) => cache.set(key, value);

module.exports = {
  getCachedResponse,
  setCacheResponse,
};
