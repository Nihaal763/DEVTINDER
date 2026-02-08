const express = require("express");
const connectDB = require("./config/database.js"); 
const app = express();
const User = require("./models/user.js")
const {validatesignupData} = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser"); 
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth.js");

connectDB();

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(7777 , ()=>{
    console.log("Server has started successfully and is listening to you");
});
}).catch((err)=>{
    console.log("Failed to connect to the database");
})

app.use(express.json());
app.use(cookieParser());//Middleware for parsing the cookies


app.get("/profile" , userAuth ,async(req , res) => {
     // validate the token
    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("Update Failed" + " " +    err.message);
    }
})

app.post("/login" , async (req, res) => {
    try{
        const {emailId , password} = req.body;
        
        const user = await User.findOne({emailId : emailId});
        if(user){
          const isPasswordValid = await user.validatePassword(password);
          if(!isPasswordValid){
            throw new Error("Invalid Credentials");
          }
          else{
            // Create a JWT token
            const token = await user.getJWT();
           
           // putting the token inside the cookie and sending it to the browser
            res.cookie("token" , token , {
                expires : new Date(Date.now() + 24 * 3600000)
            });
            res.send("Login successful");
          }
        }
        else{
            res.send("Invalid Credentials");
        }
    }
    catch(err){
        res.status(400).send("Update Failed" + " " +    err.message);
    }
})

app.post("/signup" , async (req , res)=> {
     try{
        //Validation of the data
        validatesignupData(req);
        
        const {firstName , lastName , emailId , password , skills } = req.body;
        // Encrypt the password
        const passwordHash1 = await bcrypt.hash(password , 10);
        const passwordHash2 = await bcrypt.hash(password , 1);
        console.log(passwordHash1);
        console.log(passwordHash2);
        //Creating the new instance of the User Model

        const user = new User({
            firstName ,
            lastName ,
            emailId ,
            password : passwordHash1,
            skills
        });
   
       const m = await user.save();
       res.send("User added successfully");
    }
    catch(err){      
       res.status(401).send("Error is" + " " +  err.message);
    }
    console.log(req.body);
})

app.post("/sendConnectionRequest" , userAuth , async(req , res) => {
    const user = req.user;
    console.log("is sending a request"); 
    res.send(user.firstName + " is sending a request");
})



// Connect to the mongoose cluster




