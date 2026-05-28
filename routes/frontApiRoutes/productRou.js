const express=require('express')
const productValidation=require('../../validations/productValidation')
const productController=require('../../controller/frontApi/productCon')
const {productUploads}=require('../../middleware/imageUploads')


const router=express.Router()



router.get("/api/frontView/list",productUploads.single("image"),productValidation.productValidations,productController.ViewAllproduct)



router.get("/api/find-single-product-front/:id",productController.findProduct)
// router.get("/api/search-product",productController.SearchProduct)



module.exports=router