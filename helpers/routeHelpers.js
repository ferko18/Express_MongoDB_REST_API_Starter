const Joi = require("@hapi/joi");

module.exports = {
  idSchema: Joi.object().keys({
    param: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
  }),
  userSchema: Joi.object().keys({
    firstName: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    lastName: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
  }),

  taskSchema: Joi.object().keys({
    title: Joi.string()
      .alphanum()
      .min(3)
      .max(255)
      .required(),
    description: Joi.string()
      .alphanum()
      .min(5)
      .max(255)
      .required(),
    duedate: Joi.date().required()
  }),

  validateParam: (schema, name) => {
    return (req, res, next) => {
      const result = Joi.validate({ param: req.params[name] }, schema);
      if (result.error) {
        return res.status(400).json({ message: "id not valid" });
      } else {
        if (!req.value) req.value = {};
        if (!req.value.params) req.value.params = {};
        req.value.params[name] = result.value.param;
        next();
      }
    };
  }, 

  validateBody: (schema)=>{
      return(req, res, next)=>
      {
        const result = Joi.validate(req.body, schema);
        if (result.error) {
          return res.status(400).json({ message: "invalid entry, make sure to enter required fields" });
        } else {
          if (!req.value) req.value = {};
          if (!req.value.body) req.value.body = {};
          req.value.body = result.value;
          next();
        }
      }
  }
};

// const useridSchema = Joi.object().keys({
//         userid: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
//       })

// module.exports = {
//     useridSchema
// }
