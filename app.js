const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv"); //dotenv for protecting crucial info such as passwords
const cookieParser = require("cookie-parser");
const hbs = require("express-handlebars");
const session = require("express-session");
//const db = require("./config/dbconfig");

dotenv.config({
  path: './.env'
});

const app = express();

  const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

db.connect((error) => {
  if (error) {
    console.log(Error)
  } else {
    console.log("MySQL Connected...")
  }
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

//parse URL encoded bodies as sent by HTML forms. Enables us to grab data from any form
app.use(express.urlencoded({
  extended: false
}));
//Parse JSON bodies as sent by API clients
app.use(express.json());
app.use(cookieParser());

//view engine setup
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'layout',
  //layoutDir: __dirname + '/views/layouts'
})); //extname specifies extension of files
app.set('view engine', 'hbs');

//define routes
app.use('/', require('./routes/admin'));
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use(express.static('public'));
//app.use(express.static('public/img'));
//app.use(express.static('public/js'));

app.listen(5000, () => {
  console.log("Server started on PORT 5000")
});
