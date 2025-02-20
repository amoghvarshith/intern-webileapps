const mongoose=require('mongoose')
const AccountSchema=new mongoose.Schema(
    {
        firstname:String,
        username:String,
        password:String,
        mobile:String
    }
)
const AccountModel=mongoose.model("account",AccountSchema)
module.exports=AccountModel

