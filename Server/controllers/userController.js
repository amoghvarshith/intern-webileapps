// import userModel from "../models/userModel.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import validator from "validator";

// // Create token
// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
// };

// // Login user
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ success: false, message: "User doesn't exist" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: "Invalid credentials" });
//     }

//     const token = createToken(user._id);
//     res.json({ success: true, token });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Register user
// const registerUser = async (req, res) => {
//   const { firstname,username, password, mobile} = req.body;
//   try {
//     // Check if user already exists
//     const exists = await userModel.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ success: false, message: "User already exists" });
//     }

//     // Validate email and password
//     if (!validator.isEmail(email)) {
//       return res.status(400).json({ success: false, message: "Please enter a valid email" });
//     }
//     if (password.length < 8) {
//       return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new userModel({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     const user = await newUser.save();
//     const token = createToken(user._id);
//     res.json({ success: true, token });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// export { loginUser, registerUser };

const user = require('express').Router()
const bcrypt = require("bcryptjs"); // Import bcryptjs
const AccountModel = require('../models/account');
const LoginModel = require("../models/login");

// login route
user.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    AccountModel.findOne({ username: username })
      .then(user => {
        if (user) {
          // Compare entered password with the stored hashed password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              return res.status(500).json({ message: 'Error comparing passwords' });
            }
  
            if (isMatch) {
              // Passwords match, login successful
              res.json({ message: "Success", role: user.role, username: user.username });
  
              // Optionally, store login data but avoid sending a response again
              LoginModel.create(req.body)
                .catch(err => {
                  console.error(err);
                  // Log error but do not send a second response
                });
  
              // Return here to prevent further code execution
              return;
            } else {
              // Passwords do not match
              return res.json({ message: "The password is incorrect" });
            }
          });
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
  
    // Validate input
    if (!firstname ||!username||  !password || !mobile) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    // Hash password before saving
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Error hashing password' });
      }
  
      // Create the user account with the hashed password
      AccountModel.create({ firstname, username, password: hashedPassword, mobile })
        .then(account => res.json(account))
        .catch(err => res.status(500).json({ message: 'Error creating account', error: err }));
    });
  });
  

module.exports = user
