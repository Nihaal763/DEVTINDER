const express = require("express");
const {userAuth} = require("../middlewares/auth.js");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest" , userAuth , async(req , res) => {
    const user = req.user;
    console.log("is sending a request"); 
    res.send(user.firstName + " is sending a request");
})

module.exports = requestRouter;