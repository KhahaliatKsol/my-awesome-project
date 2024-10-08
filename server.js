const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5173;

app.use(express.json()); // To parse JSON request bodies

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.sendStatus(403); // Forbidden
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    next();
  });
};

// Sample route to login and generate token
app.post('/login', (req, res) => {
  const username = req.body.username; // Get username from request
  const user = { name: username };

  const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Protected route example
app.get('/tasks', verifyToken, (req, res) => {
  res.json({ tasks: [] }); // Example response
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
