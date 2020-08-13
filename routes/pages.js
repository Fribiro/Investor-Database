const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Homepage',
    style: 'style.css'
  });
});

router.get('/signup', (req, res) => {
  res.render('signup', {
    title: 'Login or Register'
  });
});

router.get('/login', (req, res) => {
  res.render('signup', {
    title: 'Login or Register'
  });
});


module.exports = router;
