const statuscode= require("http-status-codes");


const category=require("../models/CategaryModel");
const productModel=require("../models/ProductModel");




module.exports.addCategory=async(req,res)=>{
    try{
        const{name,description,}=req.body;
        const finduser=await category.findOne({name})
        if(finduser){
            res.json({
                status:statuscode.BAD_REQUEST,
            sucess:false,
            message:"Category alerdy exist in our database"
         })
        }else{
            
        
            const userData={
                name:name,
                description:description,
                image: req.file ? req.file.filename : null
            }
            // console.log('Data',userData)

            const adduser=await category.create(userData)
            await adduser.save()
            if(adduser){
                res.json({
                    status:statuscode.OK,
                    sucess:true,
                    message:"category add sucessfully",
                    data:adduser
                })
            }
        }
    }catch(error){
        console.log(error);
        
    }
}

module.exports.ViewAllCategory=async(req,res)=>{
    try{
        const allCategory=await category.find().sort({createdAt:-1})
        if(allCategory){
            const SITEURL=`${process.env.SITEURL}/uploads/category/`
            const updatedUsers=allCategory.map((user)=>({
                ...user._doc,
                image:user.image ? SITEURL+user.image:null,
            }))
            res.json({
                status:statuscode.OK,
                sucess:true,
                message:"all catregory fetched successfully",
                data:updatedUsers
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

module.exports.updateCategory=async(req,res)=>{
    try{
        const id=req.params.id
        const {name,description}=req.body
        
        const updated=
               {
                name:name,
                description:description,
                image: req.file ? req.file.filename : category.image
      }

        const updateuser=await category.updateOne({_id:id},updated)
        if(updateuser.modifiedCount > 0){
            res.json({
                status:statuscode.OK,
                sucess:true,
                message:"category update sucessfully",
                data:updateuser
            })
        }
        else{
            res.json({
                status:statuscode.BAD_REQUEST,
                sucess:false,
                message:"category not found",
            })

        }
    }catch(error){
        console.log(error.message);

    }
}

module.exports.deletecategory = async (req, res) => {
  try {

    const _id = req.params.id;

    const deletecategory_id = await category.findById(_id);

    if (!deletecategory_id) {
      return res.json({
        status: statuscode.BAD_REQUEST,
        success: false,
        message: "category id not found"
      });
    }

    const productinfo = await productModel.findOne({ cat_id: _id });

    if (productinfo) {
      return res.json({
        status: statuscode.BAD_REQUEST,
        success: false,
        message: "category not deleted because category is active"
      });
    }

    console.log("productinfo", productinfo);

    const deletedata = await category.deleteOne({ _id: _id });

    if (deletedata.deletedCount > 0) {
      return res.json({
        status: statuscode.OK,
        success: true,
        message: "delete success"
      });
    } else {
      return res.json({
        status: statuscode.BAD_REQUEST,
        success: false,
        message: "not delete"
      });
    }

  } catch (error) {
    return res.json({
      status: statuscode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    });
  }
};

module.exports.findCategory=async(req,res)=>{
    try{
       const category_id=req.params.id
        

        const category_data=await  category.findOne({_id:category_id})
        if(category_data){
            
            res.json({
                status:statuscode.OK,
                sucess:true,
                message:"all category fetched successfully",
                data:category_data
            })
        }else{
            res.json({
                status:statuscode.BAD_REQUEST,
                sucess:false,
                message:"no category found",
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

module.exports.SearchCategory = async (req, res) => {
    try {

        const { name} = req.query;
        console.log("--------------",name )
        if (!name) {
            return res.json({
                status: statuscode.BAD_REQUEST,
                success: false,
                message: "pleasee provide a search query"
            })

        }

        let searchArray = {};

        if (name) {
            searchArray.name = { $regex: name, $options: "i" }
        }

        // if (email) {
        //     searchArray.email = { $regex: email, $options: "i" }

        // }
        // if (mobile) {
        //     searchArray.mobile = { $regex: mobile, $options: "i" }
        // }
        const categoryData = await category.find(searchArray)

        if (categoryData.length === 0) {

            return res.json({
                status: statuscode.BAD_REQUEST,
                success: false,
                message: "category not found"
            })
        }
        const SITEURL=`${process.env.SITEURL}/uploads/category/`
            const updatedProduct=categoryData.map((user)=>({
                ...user._doc,
                image:user.image ? SITEURL+user.image:null,
            }))

        res.json({
            status: statuscode.OK,
            success: true,
            message: "category data fatched successfully",
            data: updatedProduct

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

        const updateStatus=await category.updateOne({_id:id},updateData)

        if(updateStatus){
            res.json({
                status:statuscode.OK,
                success:true,
                message:"category status updated successfully",
                // data:updateStatus
            })
        }else{
            res.json({
                status:statuscode.BAD_REQUEST,
                success:false,
                message:"category status not updated"
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