const express       = require('express');
const router        = express();
const { Pool }      = require('pg');
const { dbParams }  = require('../../db/params/dbParams');
const { addUser }   = require('../../db/queries/users');

const pool = new Pool(dbParams);

router.post('/', async (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password.trim();

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required and cannot be empty.' });
  }
  
  return await pool
    .query(
      `
      SELECT *
      FROM users
      WHERE email = $1
      `,
      [ 
        email 
    ])
    .then((result) => {
      if (result.rows[0]) {
        res.status(401).send({message: 'A user with this email or username already exists.'});
      } else {
        addUser(req.body);
        res.status(200).send(req.body);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
});

module.exports = router;
