const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
//const db = require("./config/dbconfig");

// TODO: write the dbconnection and import it into the neccessary pages
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

//async makessure the server waits for some actions which might take some time to be done
//login function
exports.login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    if (!email || !password) {
      return res.status(400).render('login', {
        message: 'Please provide an email and password'
      })
    }
    db.query('SELECT * FROM signup WHERE email = ?', [email], async (error, results) => {
      //bcryptcompare compares the password being typed with the one in the db
      console.log(results);
      if (!results || !(await bcrypt.compare(password, results[0].password))) {
        return res.status(401).render('login', {
          message: 'Email or Password is incorrect'
        })
      } else {
        const id = results[0].id;

        //token to enable us communicate with the cookie
        const token = jwt.sign(
          {id}, //or id:id
          process.env.JWT_SECRET,
          {expires: process.env.JWT_EXPIRES_IN});
        console.log("The token is: " + token);

        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          //prevent hacking of cookies
          httpOnly: true
        }
      }
      res.cookie('jwt', token, cookieOptions);
      res.status(200).redirect("/"); //redirect user to homepage
    })
  } catch (error) {
    console.log(error)
  } finally {

  }
}
//signup function for investors
exports.signup = (req, res) => {
  console.log(req.body); //grabs data we sent from the Form

  const {
    ifirstName,
    ilastName,
    iemail,
    ipassword,
    iconfirmPassword
  } = req.body;

  //hinder sql injection by allowing each person to use only one email address
  db.query('SELECT email FROM investorSignup WHERE email = ?', [iemail], async (error, results) => {
    if (error) {
      console.log(error);
    }
    if (results.length > 0) {
      //prevent use of an email already in the db
      return res.render('signup', {
        message: 'That email is already in use'
      });
    } else if (ipassword !== iconfirmPassword) {
      return res.render('signup', {
        message: 'Passwords do not match'
      });
    }
    //do 8 runds of hashing
    let hashedPassword = await bcrypt.hash(ipassword, 8);
    console.log(hashedPassword);
    //test
    //res.send('testing');

    db.query('INSERT INTO investorSignup SET ?', {
      firstName: ifirstName,
      lastName: ilastName,
      email: iemail,
      password: hashedPassword
    }, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        console.log(results);
        return res.render('/login', {
          message: 'User registered'
        });
      }
    })
  });
}

//signup function for entrepreneurs
exports.signup = (req, res) => {
  console.log(req.body); //grabs data we sent from the Form

  const {
    efirstName,
    elastName,
    eemail,
    epassword,
    econfirmPassword
  } = req.body;

  //hinder sql injection by allowing each person to use only one email address
  db.query('SELECT email FROM entrepreneurSignup WHERE email = ?', [eemail], async (error, results) => {
    if (error) {
      console.log(error);
    }
    if (results.length > 0) {
      //prevent use of an email already in the db
      return res.render('signup', {
        message: 'That email is already in use'
      });
    } else if (epassword !== econfirmPassword) {
      return res.render('signup', {
        message: 'Passwords do not match'
      });
    }
    //do 8 runds of hashing
    let hashedPassword = await bcrypt.hash(epassword, 8);
    console.log(hashedPassword);
    //test
    //res.send('testing');

    db.query('INSERT INTO entrepreneurSignup SET ?', {
      firstName: efirstName,
      lastName: elastName,
      email: eemail,
      password: hashedPassword
    }, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        console.log(results);
        return res.render('/login', {
          message: 'User registered'
        });
      }
    })
  });
}
