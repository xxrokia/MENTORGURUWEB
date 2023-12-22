// app.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { connectToMongoDB } = require('./db');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const app = express();
const port = 5501;

// Middleware for parsing JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, etc.)
app.use(express.static('public'));

// Configure session
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true },
  })
);

let usersDB; // MongoDB users collection reference

// Connect to MongoDB
connectToMongoDB()
  .then((db) => {
    usersDB = db.collection('users');

    // Perform other setup related to MongoDB if needed

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to start the application:', error);
    process.exit(1);
  });

// Function to save a user record to MongoDB
function saveUser(email, username, password) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  usersDB.insertOne({ email, username, password: hashedPassword });
}

// Routes for MongoDB
app.post('/signup', [
  body('email').isEmail(),
  body('username').notEmpty(),
  body('password').isLength({ min: 6 }),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Continue with signup logic
  saveUser(req.body.email, req.body.username, req.body.password);
  res.redirect('/courses'); // Redirect after successful signup
});

// Regular Session Cookie Rotation
setInterval(() => {
  console.log('Interval triggered - Regenerating session ID');
  // Regenerate session ID
  // Note: req is not defined here. You might want to handle sessions differently.
  // Example: app.use(session(...)) should be configured properly
}, 1000 * 60 * 5); // Replace 5 with your desired interval in minutes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
