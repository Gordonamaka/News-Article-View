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
      const dBEmail = result.rows[0].email;
      const dBPassword = result.rows[0].password;
      const dBUser = result.rows[0].id;

      if (dBEmail) {
        console.log('Success, currently matching passwords... Check client response tab or console for verification');
        
        if (inputPassword === dBPassword) {
          let loggedUser = result.rows[0]
          req.session.user_id = dBUser;
          console.log('User ID', dBUser);
          res.status(200).send(loggedUser);
        } else if (result === false) {
          res.status(401).send('Username or Password is incorrect');
        }
      } else {
        res.status(401).send({message: "Access denied, please try again"});
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
});

module.exports = router;
