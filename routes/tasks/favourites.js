const express              = require('express');
const router               = express();
const { Pool }             = require('pg');
const { dbParams }         = require('../../db/params/dbParams');
const { deleteArticle }    = require('../../db/queries/articles');
const renameProperties     = require('../../lib/propertyCaseFormatter');


const pool = new Pool(dbParams);

/**
 * @swagger
 * /tasks/favourites:
 *   post:
 *     summary: Add an article to the user's favorites
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               publishedAt:
 *                 type: string
 *                 example: "2024-09-07"
 *               source:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Example News"
 *               author:
 *                 type: string
 *                 example: "John Doe"
 *               title:
 *                 type: string
 *                 example: "Breaking News Article"
 *               description:
 *                 type: string
 *                 example: "This is a description of the breaking news article."
 *               url:
 *                 type: string
 *                 example: "https://www.example.com/article"
 *               urlToImage:
 *                 type: string
 *                 example: "https://www.example.com/image.jpg"
 *             required:
 *               - publishedAt
 *               - source
 *               - author
 *               - title
 *               - description
 *               - url
 *               - urlToImage
 *     responses:
 *       201:
 *         description: Successfully added the article to favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 publishedAt:
 *                   type: string
 *                   example: "2024-09-07"
 *                 source:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Example News"
 *                 author:
 *                   type: string
 *                   example: "John Doe"
 *                 title:
 *                   type: string
 *                   example: "Breaking News Article"
 *                 description:
 *                   type: string
 *                   example: "This is a description of the breaking news article."
 *                 url:
 *                   type: string
 *                   example: "https://www.example.com/article"
 *                 urlToImage:
 *                   type: string
 *                   example: "https://www.example.com/image.jpg"
 *       404:
 *         description: Error while adding article
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "addarticle error = [error message]"
 */

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
    .then((result) => {
      let article = result.rows[0]; 
      res.status(201).json(article);
      return result.rows[0];
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
    .then((result) => {
      const articles = result.rows;
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