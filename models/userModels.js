const mongoose=require('mongoose')
const userschema=new mongoose.Schema({
    first_name:{type:String,text:true},
    last_name:{type:String,text:true},
    email:{type:String,text:true},
    password:{type:String,text:true},
    mobile:{type:Number,text:true},
    role:{type:String,text:true,default:"user"},
    address:{type:String,text:true},
    image:{type:String},
    status:{type:Boolean,default:true},

},{timestamps:true})
module.exports=mongoose.model("users",userschema)

