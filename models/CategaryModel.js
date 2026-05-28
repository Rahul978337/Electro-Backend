const mongoose=require('mongoose')
const categaryschema=new mongoose.Schema({
    name:{type:String,text:true},
    description:{type:String,text:true},
    image:{type:String},
    status:{type:Boolean,default:true},

},{timestamps:true})
module.exports=mongoose.model("category",categaryschema)

