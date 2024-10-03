const express       = require('express');
const router        = express();
const { Pool }      = require('pg');
const { dbParams }  = require('../../db/params/dbParams');
const { addUser }   = require('../../db/queries/users');

const pool = new Pool(dbParams);

/**
/**
 * @swagger
 * /tasks/register:
 *   post:
 *     summary: Registers a new user
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
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: strongPassword123
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *                 password:
 *                   type: string
 *                   example: strongPassword123
 *       400:
 *         description: Bad request (email and password are required)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email and password are required and cannot be empty.
 *       401:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: A user with this email or username already exists.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
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
