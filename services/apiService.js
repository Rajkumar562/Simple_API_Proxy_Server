const axios = require("axios");

const fetchFromApi = async (query) => {
  const apiResponse = await axios.get("https://api.github.com", { params: query });
  return apiResponse.data;
};

module.exports = {
  fetchFromApi,
};
