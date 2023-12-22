// students.js
const express = require('express');
const router = express.Router();
const { saveStudent } = require('../app');

// Route to add student
router.post('/add', (req, res) => {
  const { name, courses } = req.body;
  saveStudent(name, courses);
  res.redirect('/students'); // Redirect after adding student
});

module.exports = router;
