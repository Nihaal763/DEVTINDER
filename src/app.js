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

app.patch("/user/:userId" , async(req , res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try{
        const ALLOWED_UPDATES = ["photoUrl" , "about" , "gender" , "age" , "skills"];
        const isUpdateAllowed = Object.keys(data).every((k) => {
            return ALLOWED_UPDATES.includes(k);
        })
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        if(data?.skills.length > 10){
            throw new Error("Skills cannot be more than 10");
        }
        //Check for duplicates in database Homework TODO
        const user = await User.findByIdAndUpdate(userId , data , {
            returnDocument : "after" ,
            runValidators : true 
        });
        console.log(user);
        res.send("User added successfully");
    }catch(err){
        res.status(400).send("Update Failed" + " " +    err.message);
    }
});

app.post("/signup" , async (req , res)=> {
    const user = new User(req.body);
    try{
       const m = await user.save();
       res.send("User added successfully");
    }
    catch(err){      
       res.status(401).send("Error is" + " " +  err.message);
    }
    console.log(req.body);
})

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

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    console.log(userEmail);
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }

    // const users = await User.find({ emailId: userEmail });
    // if (users.length === 0) {
    //   res.status(404).send("User not found");
    // } else {
    //   res.send(users);
    // }
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    //const user = await User.findByIdAndDelete(userId);

    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});


// Connect to the mongoose cluster




