require('dotenv').config();
const { Pool }     = require('pg');
const { dbParams } = require('../params/dbParams');
const bcrypt = require("bcrypt");


const pool = new Pool(dbParams);

/**
 * Add A New User
 * @param {*} user
 * @returns Newly Created User
 */
exports.addUser = function(values) {
  // Hashing for Security - Set aside for time
  const password = values.password;
  const hashedPassword = bcrypt.hashSync(password, 10);
  return pool
    .query(
      `
      INSERT INTO users (first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [
        values.first_name,
        values.last_name,
        values.email,
        values.password
      ]
    )
    .then((result) => {
      console.log("Added user was successful");
      return result.rows[0];
    })
    .catch((err) => {
      console.log("addUser error = " + err.message);
    });
};