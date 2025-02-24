const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require('./controllers/userController')
const protectedRoutes = require('./controllers/protectedRoutes'); // adjust the path as needed
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb+srv://admin12:eDW0USMLsHIe6ldD@cluster0.nrcmq.mongodb.net/imdb")
  .then(() => console.log('DB Connected'))
  .catch(err => console.error('DB Connection Error:', err));

app.use(express.json());
app.use(cors());
app.use('/auth',userRoute); //dont touch 

app.use('/api', protectedRoutes); // e.g., all protected routes under /api
app.listen(3000, () => {
  console.log("Server is Running on port 3000");
});




