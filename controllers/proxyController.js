const { fetchFromApi } = require("../services/apiService");
const { getCachedResponse, setCacheResponse } = require("../services/cacheService");

const handleProxyRequest = async (req, res) => {
  const { query } = req;
  const cacheKey = JSON.stringify(query);

  try {
    // Check cache
    const cachedResponse = getCachedResponse(cacheKey);
    if (cachedResponse) {
      console.log("Serving from cache");
      req.rateLimitStatus = "cache hit";
      return res.status(200).json(cachedResponse);
    }

    // Fetch from external API
    const responseData = await fetchFromApi(query);
    setCacheResponse(cacheKey, responseData);
    req.rateLimitStatus = "cache miss";
    res.status(200).json(responseData);
  } catch (error) {
    console.error("External API error:", error.message);
    res.status(500).json({ error: "Failed to fetch data from the external API" });
  }
};

module.exports = {
  handleProxyRequest,
};
