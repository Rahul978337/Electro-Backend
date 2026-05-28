

const statuscode= require("http-status-codes");


const category=require("../../models/CategaryModel");
const productModel=require("../../models/ProductModel");






module.exports.ViewCategoryName=async(req,res)=>{
    try{
        const allCategory=await category.find({status:true}).select("name").sort({createdAt:-1})
        if(allCategory){
            
            res.json({
                status:statuscode.OK,
                sucess:true,
                message:"all catregory name fetched successfully",
                data:allCategory
            })
        }else{
            res.json({
                status:statuscode.BAD_REQUEST,
                sucess:false,
                message:"no user found",
                data:[]
            })
        }
    }catch(error){
        console.log(error.message);
           res.json({
                status:statuscode.INTERNAL_SERVER_ERROR,
                sucess:false,
                message:error.message,
                data:[]
            })
    }
}