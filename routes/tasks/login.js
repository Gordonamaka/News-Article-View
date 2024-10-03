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

/**
 * @swagger
 * /tasks/login:
 *   post:
 *     summary: Logs a user into the application
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       200:
 *         description: Successfully logged in, returns user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the user
 *                 first_name:
 *                   type: string
 *                   description: The first name of the user
 *                 last_name:
 *                   type: string
 *                   description: The last name of the user
 *                 email:
 *                   type: string
 *                   description: The email address of the user
 *       401:
 *         description: Unauthorized, incorrect email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
*/

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
        req.session.user_id = dBUser.id;
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
