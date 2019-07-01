const Joi = require('@hapi/joi');

 


  module.exports = {
      useridSchema : Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }), 

  validateParam : (schema, name)=>{

    return (req, res, next)=>{
        const result = Joi.validate({param: req.params[name]}, schema);
        if (result.error)
        {
            return res.status(400).json({message: 'user id not valid'})
        }
        else{
            if(!req.value)
            req.value={}
            if (!req.value.params)
            req.value.params ={}
            req.value.params[name] = result.value.param;
            next()
        }

    }

  }
  }

// const useridSchema = Joi.object().keys({
//         userid: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
//       })

// module.exports = {
//     useridSchema
// }