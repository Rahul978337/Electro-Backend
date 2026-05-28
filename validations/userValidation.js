const {celebrate,Joi}=require('celebrate');

module.exports.singnupValidations=celebrate({
    body:Joi.object().keys({
         first_name:Joi.string().required(),
        last_name:Joi.string().required(),
        email:Joi.string().required(),
        password:Joi.string().required(),
        mobile:Joi.number().required(),
        role:Joi.string().optional(),
        address:Joi.string().required(),
        image:Joi.string().required().optional()    
          
        
    })
})

module.exports.loginValidations=celebrate({
    body:Joi.object().keys({
        email:Joi.string().required(),
        password:Joi.string().required()
    })
})