const express = require("express");
const connectDB = require("./config/database.js"); 
const app = express();
const User = require("./models/user.js")

connectDB();

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(7777 , ()=>{
    console.log("Server has started successfully and is listening to you");
});
}).catch((err)=>{
    console.log("Failed to connect to the database");
})

app.post("/signup" , (req , res)=> {
    const userObj = {
        firstName : "Sachin",
        lastName : "Tendulkar",
        emailId : "Sachin@gmail.com",
        password : "Sachin  @12345"
    }

    const user = new User(userObj);

    const m = user.save();
    res.send("User added successfully");
})




// Connect to the mongoose cluster




