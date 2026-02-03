const jwt = require("jsonwebtoken");
const User = require("../models/user.js");


const userAuth = async (req , res, next) => {

    //Read the token from the req cookies
   try{
    const cookies = req.cookies;

    const {token} = cookies;
    if(!token){
        throw new Error("Invalid TOKEN");
    }

    const decodedObj = await jwt.verify(token , "DEV@Tinder$790");

    const {_id} = decodedObj;
    const user = await User.findById(_id);
    if(!user){
        throw new Error("User not found");
    }

    req.user = user;
    next();

   }
   catch(err){
     res.status(400).send("Error :" + err.message);
   }
    

    
    //validate the token 
    //Find the user if he exists in the DB or not

}

module.exports = {
    userAuth,
}