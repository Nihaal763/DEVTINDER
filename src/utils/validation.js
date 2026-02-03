const validator = require("validator")

const validatesignupData = (req) => {
  
    const {firstName , lastName , emailId , password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name section is not filled");
    }
    if(!(firstName.length > 4 || firstName.length < 50)){
        throw new Error("first Name should be 4 to 50 characters");
    }
    
    //This validations we had already dealt in schema level

    if(!validator.isStrongPassword(password)){
       throw new Error("Please Enter a strong password");
    }
}

module.exports = {
   validatesignupData
}