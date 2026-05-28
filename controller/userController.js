const statuscode= require("http-status-codes");
const bcrypt=require("bcrypt");

const user=require("../models/userModels");
const jsonwebtoken=require("jsonwebtoken")


module.exports.sinupuser=async(req,res)=>{
    try{
        const{first_name,last_name,address,role,email,password,mobile}=req.body;
        const finduser=await user.findOne({email})
        if(finduser){
            res.json({
                status:statuscode.BAD_REQUEST,
            sucess:false,
            message:"email alerdy exist in our database"
         })
        }else{
            const saltRounds=10;
            const hashpassword=await bcrypt.hash(password,saltRounds)
            
        
            const userData={
                first_name:first_name,
                last_name:last_name,
                email:email,
                password:hashpassword,
                mobile:mobile,
                address:address,
                role:role,
                image: req.file ? req.file.filename : null
            }
            // console.log('Data',userData)

            const adduser=await user.create(userData)
            await adduser.save()
            if(adduser){
                res.json({
                    status:statuscode.OK,
                    sucess:true,
                    message:"user register sucessfully",
                    data:adduser
                })
            }
        }
    }catch(error){
        console.log(error);
        
    }
}


module.exports.adminLogin=async(req,res)=>{
    try {
        const {email,password}=req.body
        const findAdmin=await user.findOne({email})
        if(!findAdmin){
            return res.json({
                status:statuscode.BAD_REQUEST,
                success:false,
                message:"admin not found"
            })

        }
// console.log("aaaaa",findAdmin)

        if(findAdmin.role=="admin"){
            // console.log("role",findAdmin.role)
             const validpassword=await bcrypt.compare(password,findAdmin.password)
    if(!validpassword){
        return res.json({
            status:statuscode.BAD_REQUEST,
            success:false,
            message:"incorrect password"
        })
    }
    
         const token=jsonwebtoken.sign(
                        {email:findAdmin.email},process.env.JWT_SECRET
                    )
                    // console.log("token",token)
        return res.json({
            status:statuscode.OK,
            success:true,
            message:"Login successfully",
            data:findAdmin,
            token:token
        })

        }else{
            return res.json({
             status:statuscode.BAD_REQUEST,
             success:false,
             message:"you are not authorized"
            })
            }
        


    } catch (error) {
        res.json({
            status:statuscode.INTERNAL_SERVER_ERROR,
            success:false,
            message:error.message
        })
        
    }
}

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

module.exports.changePassword=async(req,res)=>{
    try{
        const id=req.params.id
        const{oldpassword,newpassword}=req.body
        const users=await user.findById({_id:id})
        if(!users){
            res.json({
                status:statuscode.BAD_REQUEST,
                sucess:false,
                message:"user not found"
            })
        }
        const passEqual=await bcrypt.compare(oldpassword,users.password)
        if(!passEqual){
            res.json({
                status:statuscode.BAD_REQUEST,
                sucess:false,
                message:"old password is incorrect"
            })
        } else{
            const saltRounds=10;
            const hashpassword=await bcrypt.hash(newpassword,saltRounds)
            const updatedpassword=await user.updateOne({_id:id},{password:hashpassword})
            if(updatedpassword){
                res.json({
                    status:statuscode.OK,
                    sucess:true,
                    message:"password changed sucessfully",
                    data:updatedpassword
                })
            }       
        }
    }catch(error){
        console.log(error.message);
    }
}

module.exports.stuatusUpdate=async(req,res)=>{
    try{
        const id=req.params.id;
        const status=req.body.status;

        const newStatus= status == true ? false : true
        const updateData={status:newStatus}

        const updateStatus=await user.updateOne({_id:id},updateData)

        if(updateStatus){
            res.json({
                status:statuscode.OK,
                success:true,
                message:"user status updated successfully",
                // data:updateStatus
            })
        }else{
            res.json({
                status:statuscode.BAD_REQUEST,
                success:false,
                message:"user status not updated"
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

module.exports.ViewAllUser=async(req,res)=>{
    try{
        const SITEURL=`${process.env.SITEURL}/uploads/users/`

        const alluser=await  user.find({role:"user"}).sort({createdAt:-1})
        if(alluser){
            const userData=alluser.map(user=>{
                return{
                    _id:user._id,
                    first_name:user.first_name,
                    last_name:user.last_name,
                    email:user.email,
                    mobile:user.mobile,
                    address:user.address,
                    image:SITEURL+user.image,
                    createdAt:user.createdAt,
                    status:user.status
                }
            })
            res.json({
                status:statuscode.OK,
                sucess:true,
                message:"all user fetched successfully",
                data:userData
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
               
            })
    }
}

module.exports.updateUser=async(req,res)=>{
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

module.exports.deleteUser=async(req,res)=>{
    try {
       const userID=req.params.id

        if(!userID){
            res.json({
                success:false,
                status:statuscode.BAD_REQUEST,
                message:"userID is required"
            })
        }
    
                const deleteProduct = await user.deleteOne({ _id: userID });
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

module.exports.findUser=async(req,res)=>{
    try{
       const userID=req.params.id
        

        const alluser=await  user.findOne({_id:userID})
        if(alluser){
            
            res.json({
                status:statuscode.OK,
                sucess:true,
                message:"all user fetched successfully",
                data:alluser
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
               
            })
    }
}

module.exports.SearchUsers = async (req, res) => {
    try {

        const { first_name, email, mobile } = req.query;
        console.log("--------------",first_name, email, mobile )
        if (!first_name && !email && !mobile) {
            return res.json({
                status: statuscode.BAD_REQUEST,
                success: false,
                message: "please provide a search query"
            })

        }

        let searchArray = { role: "user" };

        if (first_name) {
            searchArray.first_name = { $regex: first_name, $options: "i" }
        }

        if (email) {
            searchArray.email = { $regex: email, $options: "i" }

        }
        if (mobile && !isNaN(mobile)) {
            searchArray.mobile = Number(mobile);
        }
        const users = await user.find(searchArray).select("-password")

        if (users.length === 0) {
            return res.json({
                status: statuscode.OK,
                success: true,
                message: "users not found",
                data: []
            })
        }

        const SITEURL=`${process.env.SITEURL}/uploads/users/`
            const updatedUser=users.map((user)=>({
                ...user._doc,
                image:user.image ? SITEURL+user.image:null,
            }))

        res.json({
            status: statuscode.OK,
            success: true,
            message: "user data fatched successfully",
            data: updatedUser

        })

    } catch (error) {
        return res.json({
            status: statuscode.INTERNAL_SERVER_ERROR,
            success: false,
            message: error.message
        })

    }
}



