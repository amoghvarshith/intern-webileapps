const mongoose=require('mongoose')


const accountSchema = new mongoose.Schema({
  firstname: String,
  username: String,
  password: String,
  mobile: String
});

const Account = mongoose.model("accounts", accountSchema);
module.exports=Account