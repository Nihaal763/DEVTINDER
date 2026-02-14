const express = require("express");
const {userAuth} = require("../middlewares/auth.js");
const User = require("../models/user.js");
const connectionRequestModel = require("../models/connectionRequest.js");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest" , userAuth , async(req , res) => {
    const user = req.user;
    console.log("is sending a request"); 
    res.send(user.firstName + " is sending a request");
})

requestRouter.post("/request/send/:status/:userId" , userAuth , async(req , res) => {
    try{
         const fromUserId = req.user._id;
        const toUserId = req.params.userId;
        const status = req.params.status;

        if(fromUserId == toUserId){
            throw new Error("A user cannot send the connectionRequest to himself");
        }

        const validstatus = ["interested" , "ignored"];

        const isStatusValid = validstatus.includes(status);
        if(!isStatusValid){
            throw new Error(`${status} is an invalid status`);
        }
        const istoUserIdValid = await User.findById({_id : toUserId});
        if(!istoUserIdValid){
            throw new Error("This User is not registered in DEVTINDER");
        }

        const existingConnectionRequest = await connectionRequestModel.findOne({
            $or : [ 
                {fromUserId , toUserId},
                {fromUserId : toUserId , toUserId : fromUserId}
            ]
        })

        if(existingConnectionRequest){
            throw new Error("Connection Request already exists");
        }
        const connectionRequest = new connectionRequestModel({
            fromUserId ,
            toUserId ,
            status
        })

        const data = await connectionRequest.save();
        console.log(data);
        res.json({
            "message" : "Connection request sent successfully",
            data
        });
    }
    catch(err){
        res.status(401).send("the error is " + err.message);
    }
   

})
module.exports = requestRouter;