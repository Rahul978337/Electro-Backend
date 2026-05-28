const mongoose=require('mongoose')
const productschema=new mongoose.Schema({
    name:{type:String,text:true},
    price:{type:Number,text:true},
    description:{type:String,text:true},
    // cat_id:{type:String,text:true,ref:"categories"},
    cat_id:{type:mongoose.Schema.Types.ObjectId,ref:"category"},
    stock:{type:Number,text:true},
    image:{type:String},
    status:{type:Boolean,default:true},

},{timestamps:true})
module.exports=mongoose.model("products",productschema)

