const express=require('express')
const productValidation=require('../validations/productValidation')
const productController=require('../controller/productController')
const {productUploads}=require('../middleware/imageUploads')


const router=express.Router()

router.post("/api/product/add",productUploads.single("image"),productValidation.productValidations,productController.productAdd)

router.get("/api/view/list",productUploads.single("image"),productValidation.productValidations,productController.ViewAllproduct)

router.post("/api/update-product/:id",productUploads.single("image"),productController.updateProduct)
router.delete("/api/delete-product/:id",productController.deleteProduct)
router.get("/api/find-single-product/:id",productController.findProduct)
router.get("/api/search-product",productController.SearchProduct)
router.post("/updateStatusProduct/:id",productController.stuatusUpdate)






module.exports=router