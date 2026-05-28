const express=require('express')


const userValidation=require('../validations/userValidation')
const userController=require('../controller/userController')
const {userUploads}=require('../middleware/imageUploads')


const router=express.Router()

router.post("/api/v1/addUser",userUploads.single("image"),
userValidation.singnupValidations,
userController.sinupuser
)




router.post("/api/v1/loginUser",
userValidation.loginValidations,userController.adminLogin
)

router.get("/myProfile/:id",userController.myProfile)
router.post("/changePassword/:id",userController.changePassword)
router.post("/updateStatus/:id",userController.stuatusUpdate)

router.get("/api/v1/getAllUsers",userController.ViewAllUser)
router.post(
  "/api/update-user/:id",
  userUploads.single("image"),
  userController.updateUser
);
router.delete("/api/v1/delet-user/:id",userController.deleteUser)
router.get("/api/v1/find-user/:id",userController.findUser)
router.get("/api/v1/searchUsers", userController.SearchUsers);
module.exports=router