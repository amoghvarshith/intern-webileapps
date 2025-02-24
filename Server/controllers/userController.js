const user = require('express').Router();
const AccountModel = require('../models/account');
const LoginModel = require("../models/login");
const Account = require('../models/adminData')

// Login route
user.post("/login", (req, res) => {
  const { username, password } = req.body;

  AccountModel.findOne({ username: username })
    .then(user => {
      if (user) {
       
        if (password === user.password) {
          // Generate a JWT token after successful login
          const jwt = require("jsonwebtoken");
          const { JWT_SECRET } = process.env; 
          const token = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: "7d" }
          );
         
          res.json({ message: "Success", token, role: user.role, username: user.username });
          // console.log(token)
          
          LoginModel.create(req.body).catch(err => console.error(err));
          return;
        } else {
         
          return res.json({ message: "The password is incorrect" });
        }
      } else {
        
        return res.json({ message: "No records found" });
      }
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ message: "An error occurred during login" });
    });
});


// Registration route
user.post('/register', (req, res) => {
    const { firstname, username, password, mobile } = req.body;
  
    
    if (!firstname || !username || !password || !mobile) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // save withour hash
    AccountModel.create({ firstname, username, password, mobile })
      .then(account => res.json(account))
      .catch(err => res.status(500).json({ message: 'Error creating account', error: err }));
});

user.get('/count', async (req, res) => {
  try {
    const count = await Account.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user count" });
  }
});

module.exports = user;
