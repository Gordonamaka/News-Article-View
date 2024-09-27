const express      = require('express');
const router       = express();
const { Pool }     = require('pg');
const { dbParams } = require('../../db/params/dbParams');

// Input News Data into PSQL Table
const pool = new Pool(dbParams);
const { newsFetcher } = require("../../lib/newsFetcher")

// For collecting & Mapping Favourite Articles to specific User **
router.post('/', (req, res) => {
  const keyword = 'Apple';
  try {
    newsFetcher(keyword);
    res.send({message: "Data received!"});
  } catch (err) {
    console.log('Error Message', err)
  }
});

router.post(`/`, (req, res) => {

  pool
    .query(
      `
      Select * NEWS FROM USERS;
      `
    )
    .then((results) => {
      const newsData = results.rows[0].json_build_object;
      res.send({ newsData });
    })
    .catch((err) => {
      console.log(err.message);
    });
  return router;
});

module.exports = router;