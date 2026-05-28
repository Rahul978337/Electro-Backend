const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:"uploads/users",
     filename:(req, file, cb)=> {
        console.log('req',req);
        
        cb(null, file.fieldname +'_'+ Date.now() + 
        path.extname(file.originalname));
    }
})
module.exports.userUploads = multer({ storage: storage });




const storage1 = multer.diskStorage({
    destination:"uploads/category",
     filename:(req, file, cb)=> {
        console.log('req',req);
        
        cb(null, file.fieldname +'_'+ Date.now() + 
        path.extname(file.originalname));
    }
})
module.exports.categoryUploads = multer({ storage: storage1 });



const productImage = multer.diskStorage({
    destination:"uploads/product",
     filename:(req, file, cb)=> {
        console.log('req',req);
        
        cb(null, file.fieldname +'_'+ Date.now() + 
        path.extname(file.originalname));
    }
})
module.exports.productUploads = multer({ storage: productImage });



const sliderImage = multer.diskStorage({
    destination: "uploads/slider",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() +
        path.extname(file.originalname));
    }
})
module.exports.sliderUploads = multer({ storage: sliderImage });




