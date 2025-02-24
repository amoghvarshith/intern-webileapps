const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require('./controllers/userController')

const app = express();


// Connect to MongoDB
mongoose.connect("mongodb+srv://admin12:admin12@cluster0.nrcmq.mongodb.net/imdb")
  .then(() => console.log('DB Connected'))
  .catch(err => console.error('DB Connection Error:', err));

app.use(express.json());
app.use(cors());
app.use('/auth',userRoute); //dont touch 
// Define the correct Mongoose schema for `accounts`c
const accountSchema = new mongoose.Schema({
  firstname: String,
  username: String,
  password: String,
  mobile: String
});

const Account = mongoose.model("accounts", accountSchema);

// ✅ API route to count users from `accounts` collection
app.get('/api/users/count', async (req, res) => {
  try {
    const count = await Account.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user count" });
  }
});

app.listen(3000, () => {
  console.log("Server is Running on port 3000");
});




