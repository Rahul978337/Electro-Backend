const express=require('express')
const categoryValidation=require('../validations/CategaoryValidation')
const categoryController=require('../controller/CategaoryController')
const {categoryUploads}=require('../middleware/imageUploads')


const router=express.Router()

router.post("/api/category/add",categoryUploads.single("image"),categoryValidation.categoryValidations,categoryController.addCategory)

router.get("/api/category/list",categoryUploads.single("image"),categoryValidation.categoryValidations,categoryController.ViewAllCategory)


router.get("/find-category-name",categoryUploads.single("image"),categoryValidation.categoryValidations,categoryController.ViewCategoryName)

router.post(
  "/api/update-category/:id",
  categoryUploads.single("image"),
  categoryController.updateCategory
);

router.get("/api/single-category/:id",categoryController.findCategory)
router.delete("/api/delete-category/:id",categoryController.deletecategory)
router.get("/api/v1/searchCategory",categoryController.SearchCategory );
router.post("/updateStatusCategory/:id",categoryController.stuatusUpdate)





module.exports=router