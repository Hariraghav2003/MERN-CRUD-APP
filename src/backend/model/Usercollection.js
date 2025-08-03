const mongo=require("mongoose");
const userModel={
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Phone:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    }
}
const userSchema=new mongo.Schema(userModel);
const User = mongo.model("User", userSchema);
module.exports = User;