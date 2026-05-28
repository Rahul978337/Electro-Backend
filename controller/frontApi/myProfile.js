const user=require("../../models/userModels");


module.exports.myProfile=async(req,res)=>{
    try{
        const userId=req.params.id;
        const finduser=await user.findById(userId)
        if(finduser){
            res.json({
                status:statuscode.OK,
                sucess:true,
                message:"user profile fetched successfully",
                data:finduser
            })
        }else{
            res.json({
                status:statuscode.BAD_REQUEST,
                sucess:false,
                message:"user not found"
            })
        }
    }catch(error){
        console.log(error);
    }
}

module.exports.editUser=async(req,res)=>{
    try{
        const id=req.params.id
        const {first_name,last_name,email,mobile,address,role}=req.body
        
        const updated=
               {
                first_name:first_name,
                last_name:last_name,
                email:email,
                
                mobile:mobile,
                address:address,
                role:role,
                image: req.file ? req.file.filename : user.image
      }

        const updateuser=await user.updateOne({_id:id},updated)
        if(updateuser.modifiedCount > 0){
            res.json({
                status:statuscode.OK,
                sucess:true,
                message:"user update sucessfully",
                data:updateuser
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