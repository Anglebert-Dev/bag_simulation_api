// userRoutes.js
const express = require('express');
const { hash, compare } = require('bcrypt');
const db = require('./db');
const authenticateToken = require('./authMiddleware');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Route to handle user login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Fetch user from the database based on the provided username
    const [rows] = await db.query('SELECT id, username, password FROM users WHERE username = ?', [username]);

    // Check if a user with the given username exists
    if (rows.length === 1) {
      const user = rows[0];
      const passwordMatch = await compare(password, user.password);

      // Check if the provided password matches the hashed password in the database
      if (passwordMatch) {
        // Generate a JWT token and send it as a response
        const token = jwt.sign({ id: user.id, username: user.username }, 'super-secret-key');
        return res.json({ token });
      }
    }

    // Return an error response if login fails
    return res.status(401).json({ error: 'Invalid username or password' });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get all users (requires authentication)
router.get('/users', authenticateToken, async (req, res) => {
  try {
    // Fetch all users from the database
    const [rows] = await db.query('SELECT id, username FROM users');
    res.json({ users: rows });
  } catch (error) {
    console.error('Error while fetching users:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get all users (requires authentication)
router.get('/users', authenticateToken, async (req, res) => {
    try {
      // Ensure that the authenticated user has the necessary permissions to access user data
      if (!req.user || !req.user.id) {
        return res.status(403).json({ error: 'Unauthorized access' });
      }
  
      // Fetch all users from the database
      const [rows] = await db.query('SELECT id, username FROM users');
  
      // Check if any users were retrieved
      if (rows.length === 0) {
        return res.status(404).json({ error: 'No users found' });
      }
  
      // Send the list of users as a response
      res.json({ users: rows });
    } catch (error) {
      console.error('Error while fetching users:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Route to get a specific user by username (requires authentication)
router.get('/users/:username', authenticateToken, async (req, res) => {
  const { username } = req.params;
  try {
    // Fetch the user with the provided username from the database
    const [rows] = await db.query('SELECT id, username FROM users WHERE username = ?', [username]);

    // Send the user data as a response
    res.json({ user: rows[0] });
  } catch (error) {
    console.error('Error while fetching user by username:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create a new user
router.post('/users', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input: Ensure username and password are provided
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await hash(password, 10);

    // Insert the new user into the database
    await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

    // Send a success message as a response
    res.json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error while creating a new user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
