const express              = require('express');
const router               = express();
const { Pool }             = require('pg');
const { dbParams }         = require('../../db/params/dbParams');
const { deleteArticle }    = require('../../db/queries/articles');
const renameProperties     = require('../../lib/propertyCaseFormatter');


const pool = new Pool(dbParams);

router.post("/", async (req, res) => {
  const currentUser = req.session.user_id;
  return await pool
    .query(
      `
        INSERT INTO articles (user_id, publishedAt, source, author, title, description, url, urlToImage)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
        `,
      [currentUser, 
       req.body.publishedAt, 
       req.body.source.name, 
       req.body.author, 
       req.body.title, 
       req.body.description, 
       req.body.url, 
       req.body.urlToImage]
    )
    .then((results) => {
      let article = results.rows[0]; 
      res.status(201).json(article);
      return results.rows[0];
    })
    .catch((err) => {
      res.status(404).send("addarticle error = " + err.message);
    });
});

router.delete('/articles/:articleId', (req, res) => {
  const articleId = req.params.articleId;
  const currentUser = req.session.user_id;

  if (!currentUser) {
    return res.status(401).json({ message: 'Unauthorized: Please log in first.' });
  }

  deleteArticle(articleId, currentUser)
    .then((response) => {
      if (response.message === 'Article deleted successfully') {
        return res.status(200).json({ message: response.message });
      } else {
        return res.status(404).json({ message: response.message });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Server error: ' + err.message });
    });
});

// Favourite Articles Endpoint for articles held in session.
router.get('/articles', (req, res) => {
  const currentUser = req.session.user_id;
  
  if (!currentUser) {
    return res.status(401).send('User not logged in');
  }

  return pool
    .query(
      `
      SELECT * FROM articles WHERE user_id = $1;
      `,
      [currentUser]
    )
    .then((results) => {
      const articles = results.rows;
      // Case formatter
      const formattedArticles = renameProperties(articles);
      if (formattedArticles.length > 0) {
        // Date Formatter
        formattedArticles.forEach(article => {
          if (article.publishedAt) {
            article.publishedAt = new Date(article.publishedAt).toISOString().split('T')[0]; 
          }
        });
        res.status(200).json(formattedArticles);
      } else {
        res.status(404).send('No articles found for this user.');
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send('Server error: ' + err.message);
    });
});



module.exports = router;