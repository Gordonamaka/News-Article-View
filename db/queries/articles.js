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

exports.addArticle = function(body) {
  return pool
    .query(
      `
      INSERT INTO users (source_name, author, title, description, url, urlToImage, published_at, content)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
      `,
      [
        body.source.name,
        body.author,
        body.title,
        body.description,
        body.url,
        body.urlToImage,
        body.publishedAt,
        body.content,
      ]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log("addArticle error = " + err.message);
    });
};