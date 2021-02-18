const express = require("express");
const auth = require('../middleware/auth'); 

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Homepage',
    style: 'style.css'
  });
});

router.get('/signup', (req, res) => {
  res.render('signup', {
    title: 'Login or Register',
    style: 'signup.css',
    fontawesome: '//use.fontawesome.com/releases/v5.0.7/css/all.css'
  });

});

router.get('/login', (req, res) => {
  res.render('signup', {
    title: 'Login or Register',
    style: 'signup.css',
    fontawesome: '//use.fontawesome.com/releases/v5.0.7/css/all.css'
  });
});

router.get('/investor', (req, res) => {
  res.render('investor', {
    title: 'Investor | Types',
    style: 'style.css'
  });
});

// router.get('/entrepreneur', auth, (req, res) => {
//   res.render('entrepreneur', {
//     title: 'Investment | Indusries',
//     style: 'style.css'
//   });
// });

router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us',
    style: 'style.css'
  });
});

router.get("/profile", (req, res) => {
  res.render("profile", {
    title: "Profile Setup",
    style: "profile.css",
  });
});

/*router.get('/admin', (req, res) => {
  res.render('admin', {
    title: 'Admin',
    style: 'admin.css'
  });
});*/

module.exports = router;
