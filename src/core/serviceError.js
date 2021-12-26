const NOT_FOUND = "NOT_FOUND";
const VALIDATION_FAILED = "VALIDATION_FAILED";
const UNAUTHORIZED = "UNAUTHORIZED";
const FORBIDDEN = "FORBIDDEN";
const EMAIL_IN_USE = "EMAIL_IN_USE";
const USERNAME_IN_USE = "USERNAME_IN_USE";
const EMAIL_AND_USERNAME_IN_USE = "EMAIL_AND_USERNAME_IN_USE"
const UNKNOWN = "UNKNOWN";
const WRONG_CREDENTIALS = "WRONG_CREDENTIALS";

class ServiceError extends Error {

  constructor(code, message, details = {}){
    super(message);
    this.code = code;
    this.details = details;
    this.name = "ServiceError";
  }


  get IsNotFound() {
    return this.code === NOT_FOUND;
  }
  get isValidationFailed(){
    return this.code === VALIDATION_FAILED;
  }
  get isUnauthorized(){
    return this.code === UNAUTHORIZED;
  }
  get isForbidden(){
    return this.code === FORBIDDEN;
  }
  get isEmailInUse(){
    return this.code === EMAIL_IN_USE;
  }
  get isUsernameInUse(){
    return this.code === USERNAME_IN_USE;
  }
  get isEmailAndUsernameInUse(){
    return this.code === EMAIL_AND_USERNAME_IN_USE;
  }
  get isUnknownError(){
    return this.code === UNKNOWN;
  }
  get isWrongCredentials(){
    return this.code === WRONG_CREDENTIALS;
  }




  static notFound(message,details){
    return new ServiceError(NOT_FOUND, message, details)
  }
  static validationFailed(message,details){
    return new ServiceError(VALIDATION_FAILED, message, details)
  }
  static unauthorized(message,details){
    return new ServiceError(UNAUTHORIZED, message, details)
  }
  static forbidden(message,details){
    return new ServiceError(FORBIDDEN, message, details)
  }
  static emailInUse(message, details){
    return new ServiceError(EMAIL_IN_USE, message, details)
  }
  static usernameInUse(message, details){
    return new ServiceError(USERNAME_IN_USE, message, details)
  }
  static emailAndUsernameInUse(message, details){
    return new ServiceError(EMAIL_AND_USERNAME_IN_USE, message, details)
  }
  static unknown(message, details){
    return new ServiceError(UNKNOWN, message, details);
  }
  static wrongCredentials(message, details){
    return new ServiceError(WRONG_CREDENTIALS, message, details);
  }

  

}


module.exports = ServiceError;