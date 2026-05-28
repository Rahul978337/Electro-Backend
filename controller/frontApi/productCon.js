const statuscode= require("http-status-codes");

const productModel=require("../../models/ProductModel");



module.exports.ViewAllproduct=async(req,res)=>{
    try{
        const allProduct=await productModel.find().sort({createdAt:-1}).populate("cat_id","name")
        if(allProduct){
            const SITEURL=`${process.env.SITEURL}/uploads/product/`
            const updateProduct=allProduct.map((product)=>({
                ...product._doc,
                image:product.image ? SITEURL+product.image:null,
            }))
            res.json({
                status:statuscode.OK,
                sucess:true,
                message:"all product fetched successfully",
                data:updateProduct
            })
        }else{
            res.json({
                status:statuscode.BAD_REQUEST,
                sucess:false,
                message:"no product found",
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

module.exports.findProduct=async(req,res)=>{
    try{
       const product_id=req.params.id
        

        const productFind=await  productModel.findOne({_id:product_id}).populate("cat_id", "name")
        if(productFind){
            const SITEURL=`${process.env.SITEURL}/uploads/product/`
            const updatedProduct = {
                ...productFind._doc,
                image: productFind.image ? SITEURL+productFind.image : null
            }
            res.json({
                status:statuscode.OK,
                sucess:true,
                message:"product fetched successfully",
                data:updatedProduct
            })
        }else{
            res.json({
                status:statuscode.BAD_REQUEST,
                sucess:false,
                message:"no product found",
                data:[]
            })
        }
    }catch(error){
        console.log(error.message);
           res.json({
                status:statuscode.INTERNAL_SERVER_ERROR,
                sucess:false,
                message:error.message,
               
            })
    }
}