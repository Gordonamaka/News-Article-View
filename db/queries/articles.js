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
exports.deleteArticle = function(articleId) {

  const id = Number(articleId);
  return pool
  .query(
      `
      DELETE FROM articles
      WHERE id = ${id};`
  )
  .then((res) => {
      console.log(`The Article has been deleted.`);
  })
  .catch((err) => {
      console.log('Sorry, we were not able to delete the article...' + err.message);
  })
};