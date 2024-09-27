require('dotenv').config({ path: '../.env' });
const { default: axios } = require('axios');
const express            = require("express");
const router             = express.Router();

router.post("/", async (req, res) => {
  const ticker           = req.body
  const { symbol }       = ticker
  const keyword          = symbol
  const API_KEY          = process.env.API_KEY
  if (!symbol) {
    return res.status(400).send({ error: "Symbol is required" });
  }
  try {
  const response         = await axios.get(
    `https://newsapi.org/v2/everything?` + 
    `q=${keyword}&` +
    `from=2024-09-01&` +
    `language=en&` +
    `pageSize=20&` +
    `sortBy=popularity&` +
    `apiKey=${API_KEY}`
  );
    res.status(200).send(response.data.articles);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch articles" });
  }
});

module.exports = router;