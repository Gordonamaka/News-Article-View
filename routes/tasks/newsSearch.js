require('dotenv').config({ path: '../.env' });
const { default: axios } = require('axios');
const express            = require("express");
const router             = express.Router();

// API URL - Can add Date & Sort functionalities - Will not for simplicity
router.get("/", async (req, res) => {
  const keyword         = 'Apple';
  const API_KEY         = process.env.API_KEY
  const response        = await axios.get(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${API_KEY}`)
  

  try {
    res.send(response.data.articles);
  } catch (err) {
    res.send('Error Message', err);
  }
  // const articlesList = response.data.articles;
  // res.json(articlesList);
});

router.post("/", async (req, res) => {
  const symbol = req.body
  console.log(symbol);
  if (!symbol) {
    return res.status(400).send({status: 'Failed'})
  }
  res.status(200).send({status: 'Received query'});
})

module.exports = router;