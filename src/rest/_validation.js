const Joi = require("joi");


const JOI_OPTIONS = {
  abortEarly: false,
  allowUnknown: false, // niet negeren --> return: "parameter x mag hier niet"
  context: true,
  convert: true,
  presence: "required"

};

const cleanUpJoiError = (error) => error.details.reduce((resultObj, {
  message,
  path,
  type
}) =>{
  const joinedPath = path.join(".") || "value";
  if( !resultObj[joinedPath]){
    resultObj[joinedPath] = [];
  }
  resultObj[joinedPath].push({
    type,
    message,
  });
  return resultObj
}, {});


const schemaPropertySetter = (schema, prop, ctx, errors) => {
  if(schema[prop]){
    if(!Joi.isSchema(schema[prop])){
      schema[prop] = Joi.object(schema[prop] || {});
    }
    const { 
      error: err,
      value: val, 
    } = schema[prop].validate(ctx.request[prop], JOI_OPTIONS);

    if (err){
      errors[prop] = cleanUpJoiError(err);
    }else{
      ctx.request[prop] = val;
    }
  }
}


const validate = (schema) => {
  if(!schema){
    schema = {
      query: {},
      body: {},
      params:{},
    };
  }

return (ctx, next) => {
  let errors = {};
  schemaPropertySetter(schema, "query", ctx, errors);
  schemaPropertySetter(schema, "body", ctx, errors);
  schemaPropertySetter(schema,"params", ctx, errors );

if(Object.keys(errors).length > 0){
  ctx.throw(400, "Validation failed, check details for more information", {
    code: "VALIDATION_FAILED",
    details: errors,
  });
}
  return next();
};

}



module.exports = validate;