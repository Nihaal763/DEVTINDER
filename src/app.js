const express = require("express");
const connectDB = require("./config/database.js"); 
const app = express();
const cookieParser = require("cookie-parser"); 
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());//Middleware for parsing the cookies

const authRouter  = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");

app.use("/" , authRouter);
app.use("/" , profileRouter);
app.use("/" , requestRouter); 



connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(7777 , ()=>{
    console.log("Server has started successfully and is listening to you");
});
}).catch((err)=>{
    console.log("Failed to connect to the database");
})














// Connect to the mongoose cluster




