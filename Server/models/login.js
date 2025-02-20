const mongoose = require("mongoose");

// Define Login Schema without loginTime
const LoginSchema = new mongoose.Schema({
  username: String, // The username of the logged-in user
  password: String, // Store the user's password for this login
});

// Create the Login Model
const LoginModel = mongoose.model("logindetails", LoginSchema);

module.exports = LoginModel;