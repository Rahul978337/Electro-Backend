const {celebrate,Joi}=require('celebrate');

module.exports.categoryValidations=celebrate({
    body:Joi.object().keys({
         name:Joi.string().required(),
        description:Joi.string().required(),
        image:Joi.string().required().optional()    
          
        
    })
})
