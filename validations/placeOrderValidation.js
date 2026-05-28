const { celebrate, Joi } = require("celebrate");

module.exports.placeOrderValidation = celebrate({
  body: Joi.object({
    
    userId: Joi.string()
      .required()
      .messages({
        "string.empty": "userId is required",
        "any.required": "userId is required"
      }),

    paymentMode: Joi.string()
      .valid("COD", "ONLINE", "UPI")
      .required()
      .messages({
        "any.only": "paymentMode must be COD, ONLINE or UPI",
        "any.required": "paymentMode is required"
      }),

  }),
});