const {celebrate,Joi}=require('celebrate');

module.exports.productValidations=celebrate({
    body:Joi.object().keys({
         name:Joi.string().required(),
        price:Joi.number().required(),
        description:Joi.string().required(),
        stock:Joi.number().required(),
        cat_id:Joi.string().required(),
        image:Joi.string().required().optional()    
          
        
    })
})