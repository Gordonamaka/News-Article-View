require('dotenv').config();
const { Pool }     = require('pg');
const { dbParams } = require('../params/dbParams');

const pool = new Pool(dbParams);

/**
 * Map a Favourite Article to A User
 * @param {*} user
 * @param {*} article
 * @returns Newly favourited article
**/

// Unused - Reference Only
exports.addArticle = function(values, userId) {
  
  console.log(values);
  return pool
    .query(
      `
      INSERT INTO articles (user_id, source_name, author, title, description, url, urlToImage, published_at, content)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
      `,
      [
        userId,
        values.source.name,
        values.author,
        values.title,
        values.description,
        values.url,
        values.urlToImage,
        values.publishedAt,
        values.content,
      ]
    )
    .then((result) => {
      res.status(202).send('Success! A new article has been added to the database!');
      return result.rows[0];
    })
    .catch((err) => {
      console.log("addArticle error = " + err.message);
    });
};

/**
 * Delete a favourtied Article
 * @param {*} id
 * @returns {Promise<{}>} A promise to the user.
*/
exports.deleteArticle = function(articleId, userId) {
  return pool
    .query(
      `
      DELETE FROM articles
      WHERE id = $1 AND user_id = $2
      RETURNING *;
      `,
      [articleId, userId]
    )
    .then((result) => {
      if (result.rowCount > 0) {
        console.log(`The Article with id ${articleId} has been deleted.`);
        return { message: 'Article deleted successfully' };
      } else {
        return { message: 'Article not found, you do not have permission to unfavourite it, or cannot be unfavourited' };
      }
    })
    .catch((err) => {
      console.log('Error deleting article: ' + err.message);
      throw err;
    });
};