//handling the custom errors like in auth.controller.js
//from there we can just simply call this handler with the custom error statusCode and 
//it will use the Error() constructor of js to create the new error which can 
//be either shown or pass to the middle ware in the index.js

export const errorHandler = (statusCode, message)=>{
    const error = new Error(); //Error object instance
    error.statusCode = statusCode;
    error.message = message;
    return error;
};