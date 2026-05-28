const statuscode= require("http-status-codes");

const productModel=require("../models/ProductModel");



module.exports.productAdd=async(req,res)=>{
    try{
        const {name,price,stock,cat_id,description}=req.body;
        const findProduct=await productModel.findOne({name})
        if(findProduct){
            res.json({
                status:statuscode.BAD_REQUEST,
            sucess:false,
            message:"product name alerdy exist in our database"
         })
        }else{
            
        
            const productData={
                name:name,
                description:description,
                price:price,
                stock:stock,
                cat_id:cat_id,
                image: req.file ? req.file.filename : null
            }
       

            const addProduct=await productModel.create(productData)
            await addProduct.save()
            if(addProduct){
                res.json({
                    status:statuscode.OK,
                    sucess:true,
                    message:"product add sucessfully",
                    data:addProduct
                })
            }
        }
    }catch(error){
        res.json({
                    status:statuscode.OK,
                    sucess:true,
                    message:error.message,
                    
                })
        
    }
}

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

module.exports.updateProduct=async(req,res)=>{
    try{
        const id=req.params.id
        const {name,price,stock,cat_id,description}=req.body
        
        const updated={
                name:name,
                description:description,
                price:price,
                stock:stock,
                cat_id:cat_id,
            }
            
        if (req.file) {
            updated.image = req.file.filename;
        }

        const updateProduct=await productModel.updateOne({_id:id},updated)
        if(updateProduct.modifiedCount > 0){
            res.json({
                status:statuscode.OK,
                sucess:true,
                message:"product update sucessfully",
                data:updateProduct
            })
        }
        else{
            res.json({
                status:statuscode.BAD_REQUEST,
                sucess:false,
                message:"user not found",
            })

        }
    }catch(error){
        console.log(error.message);

    }
}

module.exports.deleteProduct=async(req,res)=>{
    try {
       const product_id=req.params.id

        if(!product_id){
            res.json({
                success:false,
                status:statuscode.BAD_REQUEST,
                message:"product_id is required"
            })
        }
    
                const deleteProduct = await productModel.deleteOne({ _id: product_id });
        if (deleteProduct.deletedCount > 0) {
            return res.json({
                status:statuscode.OK,
                success: true,
                message: "Product delete successfully"
            });
        } else {
            return res.json({
                status:statuscode.BAD_REQUEST,
                success: false,
                message: " product not deleted"
            });
        }

    
    } catch (error) {
               console.log(error.message);

        
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



module.exports.SearchProduct = async (req, res) => {
    try {

        const { name, cat_id } = req.query;

        let searchArray = {};

        if (name) {
            searchArray.name = { $regex: name, $options: "i" }
        }

        if (cat_id) {
            searchArray.cat_id = cat_id
        }

        const products = await productModel
            .find(searchArray)
            .populate("cat_id", "name")
            .select("-password")

        if (products.length === 0) {
            return res.json({
                status: statuscode.BAD_REQUEST,
                success: false,
                message: "products not found"
            })
        }

        const SITEURL = `${process.env.SITEURL}/uploads/product/`

        const updateProduct = products.map((product) => ({
            ...product._doc,
            image: product.image ? SITEURL + product.image : null,
        }))

        res.json({
            status: statuscode.OK,
            success: true,
            message: "product data fetched successfully",
            data: updateProduct
        })

    } catch (error) {
        return res.json({
            status: statuscode.INTERNAL_SERVER_ERROR,
            success: false,
            message: error.message
        })
    }
}

module.exports.stuatusUpdate=async(req,res)=>{
    try{
        const id=req.params.id;
        const status=req.body.status;

        const newStatus= status == true ? false : true
        const updateData={status:newStatus}

        const updateStatus=await productModel.updateOne({_id:id},updateData)

        if(updateStatus){
            res.json({
                status:statuscode.OK,
                success:true,
                message:"product status updated successfully",
                // data:updateStatus
            })
        }else{
            res.json({
                status:statuscode.BAD_REQUEST,
                success:false,
                message:"product status not updated"
            })
        }
    }catch(error){
        res.json({
                status:statuscode.BAD_REQUEST,
                sucess:false,
                message:error.message
            })
    }
}