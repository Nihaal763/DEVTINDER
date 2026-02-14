const express = require("express");
const {userAuth} = require("../middlewares/auth.js");
const {validateEditprofileData} =require("../utils/validation.js");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");

const profileRouter = express.Router();

profileRouter.get("/profile/view" , userAuth ,async(req , res) => {
     // validate the token
    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("Update Failed" + " " +    err.message);
    }
})

profileRouter.patch("/profile/edit" , userAuth , async(req , res) => {
   const user = req.user;
   try{
    if(!validateEditprofileData(req)){
        throw new Error("Some of the fields cannot be changed");
    }
    else{
        const loggedinUser = req.user;
        Object.keys(req.body).forEach((key) => loggedinUser[key] = req.body[key]);
        res.send(loggedinUser);
        await loggedinUser.save();
    }
   }
   catch(err){
    res.status(401).send("the error is " + err.message);
   }

})

profileRouter.patch("/profile/password" , async(req , res) => {
    //here we need to get the email , password(updated one) 
    //We will match the email to get the document get the hashed password for the user entered password
    //Replace the field of password with the hashed password
    //Check again with Login API for testing

    try{
        const { emailId , password} = req.body;
        const user = await User.findOne({emailId : emailId});
        if(!user){
          throw new Error("Invalid credentials");
        }
        
        const newhashedpassword = await bcrypt.hash(password , 10);
        user.password = newhashedpassword;
        await user.save();
        res.send("Password changed successfully");

    }
    catch(err){
         res.status(401).send("the error is " + err.message);
    }
    
})

module.exports = profileRouter ;

// - Create PATCH /profile/password API => forgot password API