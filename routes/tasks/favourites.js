const express      = require('express');
const router       = express();
const { Pool }     = require('pg');
const { dbParams } = require('../../db/params/dbParams');


const pool = new Pool(dbParams);

// endpoint to run a select to fetch a users favourites with a specific article id
router.get('/id', (req, res) => {

  const currentUser = req.session.user_id;
  console.log("Current User is:", currentUser);

  if (currentUser) {
    pool
    .query(

      `SELECT * FROM articles WHERE user_id = ${currentUser};`

    )
    .then((results) => {
      const articles = results.rows;
      res.json({ articles });
    })
    .catch((err) => {
      console.log(err.message);
    });
  // return router;
  } else {
    res.status(404).send('Cannot GET /');
  };
});

router.post("/", (req, res) => {
  const currentUser = req.session.user_id;

  const id = req.body.id
  const article = req.body.article

  // Incomplete Query Pool ...
  return pool
    .query(
      `
        INSERT INTO articles (user_id, article_id, article)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
      [currentUser, id, article]
    )
    .then((result) => {
      res.status(200).send("New article was added"); 
      return result.rows[0];
    })
    .catch((err) => {
      res.status(404).send("addarticle error = " + err.message);
    });
});



module.exports = router;