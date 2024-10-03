const express      = require('express');
const router       = express();
const { Pool }     = require('pg');
const { dbParams } = require('../../db/params/dbParams');


const pool = new Pool(dbParams);

// endpoint to run a select to fetch a users favourites with a specific article id
// router.get('/id', (req, res) => {

//   const currentUser = req.session.user_id;
//   console.log("Current User is:", currentUser);

//   if (currentUser) {
//     pool
//     .query(

//       `SELECT * FROM articles WHERE user_id = ${currentUser};`

//     )
//     .then((results) => {
//       const articles = results.rows;
//       res.json({ articles });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
//   // return router;
//   } else {
//     res.status(404).send('Cannot GET /');
//   };
// });

router.post("/", async (req, res) => {
  const currentUser = req.session.user_id;
  return await pool
    .query(
      `
        INSERT INTO articles (user_id, date, source, author, title, description, url, urlToImage)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
        `,
      [currentUser, 
       req.body.date, 
       req.body.source, 
       req.body.author, 
       req.body.title, 
       req.body.description, 
       req.body.url, 
       req.body.urlToImage]
    )
    .then((result) => {
      console.log('DB Result', result.rows[0]);
      let article = result.rows[0]; 
      res.status(201).send(article);
      return result.rows[0];
    })
    .catch((err) => {
      res.status(404).send("addarticle error = " + err.message);
    });
});


module.exports = router;