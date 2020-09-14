const mysql = require("mysql");
const express = require("express");
const router = express.Router(); module.exports = router;
//const db = require("./config/dbconfig");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

//route for homepage
router.get('/admin', (req, res) => {

  let sql = "SELECT * FROM signup";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.render('admin', {
      title: 'Admin',
      style: 'admin.css',
      results: results
    });
  });
});

//route for insert data
router.post('/save', (req, res) => {
  let data = { firstName: req.body.firstName, middleName: req.body.middleName, lastName: req.body.lastName, email: req.body.email, password: req.body.password };
  let sql = "INSERT INTO product SET ?";
  let query = db.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

//route for update data
router.post('/update', (req, res) => {
  let sql = "UPDATE signup SET firstName='" + req.body.firstName + "',middleName='" + req.body.middleName + "',lastName='" + req.body.lastName + "', email='" + req.body.email + "', password='" + req.body.password + "' WHERE id=" + req.body.id;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

//route for delete data
router.post('/delete', (req, res) => {
  let sql = "DELETE FROM signup WHERE id=" + req.body.id + "";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

module.exports = router;