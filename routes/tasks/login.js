require('dotenv').config({ path: '../.env' });
const express         = require('express');
const router          = express();
const { Pool }        = require('pg');
const cookieSession   = require('cookie-session');
const { dbParams }    = require('../../db/params/dbParams');

const pool = new Pool(dbParams);

// In memory login credentials storage
router.use(cookieSession({
  name: 'news_assessment',
  keys: [ process.env.keys ],
}));

router.post('/', (req, res) => {  
  const inputEmail = req.body.email;
  const inputPassword = req.body.password;
  return pool
    .query(
      `
      SELECT *
      FROM users
      WHERE email = $1
      `, [inputEmail]
    )
    .then((result) => { 
      if (result.rows.length === 0) {
        // No user found with the given email
        return res.status(401).send({ message: "Access denied, please try again" });
      }
    
      const dBUser = result.rows[0];
      const dBPassword = dBUser.password;
    
      if (inputPassword === dBPassword) {
        req.session.user_id = dBUser;
        res.status(200).send(dBUser);
      } else {
        res.status(401).json({message: 'Username or Password is incorrect'});
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ message: "Internal server error" });
    });
});

module.exports = router;
