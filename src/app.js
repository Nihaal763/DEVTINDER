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

app.use(express.json());

// app.post("/signup" , async (req , res)=> {
//     // const userObj = {
//     //     firstName : "Sachin",
//     //     lastName : "Tendulkar",
//     //     emailId : "Sachin@gmail.com",
//     //     password : "Sachin  @12345"
//     // }
//       const user = new User(req.body);
    
//     try{
//        const m = await user.save();
//        res.send("User added successfully");
//     }
//     catch{      
//        res.status(401).send("Error saving the usrer");
//     }
//     console.log(req.body);
// })

// app.get("/user" , async (req , res) => {

//     try{
//          const email = req.body.emailId;
//          const user = await User.find({emailId : email});
//          if(user.length === 0){
//             res.status(400).send("cannot find a user with this details");
//          }
//          else{
//             res.send(user);
//          }     
//     }
//     catch{
//         res.status(400).send("cannot find a user with this details");
//     }
   
// })




app.get("/feed" , async (req ,res)=> {
    try{
        const user = await User.find({});
        res.send(user);
        if(user.length === 0){
            res.send("No data of the users yet it starts from now");
        }
        else{
            res.send(user);
        }
    }
    catch{
        res.status(400).send("cannot find a user with this details");   
    }
});


// Connect to the mongoose cluster




