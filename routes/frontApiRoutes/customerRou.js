const express=require('express')


const userValidation=require('../../validations/userValidation')
const userController=require('../../controller/frontApi/customerCon')
const {userUploads}=require('../../middleware/imageUploads')


const router=express.Router()

router.post("/api/v2/regiterUser",userUploads.single("image"),
userValidation.singnupValidations,userController.registerUser
)




router.post("/api/v2/loginUser",
userValidation.loginValidations,userController.loginuser
)


module.exports=router