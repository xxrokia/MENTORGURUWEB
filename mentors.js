// mentors.js
const express = require('express');
const router = express.Router();
const { saveMentor } = require('../app');

// Route to add mentor
router.post('/add', (req, res) => {
  const { name, expertise, courses } = req.body;
  saveMentor(name, expertise, courses);
  res.redirect('/mentors'); // Redirect after adding mentor
});

module.exports = router;
