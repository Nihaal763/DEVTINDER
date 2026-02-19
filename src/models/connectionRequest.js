const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const connectionRequest = new Schema({

    fromUserId : {
        type : Schema.Types.ObjectId ,
        required : true
    } ,
    toUserId : {
        type : Schema.Types.ObjectId ,
        required : true
    } ,
    status : {
        type : String ,
        enum : {
          values : ["ignored" , "interested" , "accepted" , "rejected"],
          message : `{VALUE} is incorrect status type`
          //here messages are mostly the error messages.
        }
    }
},
{
    timestamps : true
})

connectionRequest.index({fromUserId : 1 , toUserId : 1});

connectionRequest.pre("save" , function(next){
  const CR = this;
  if(CR.fromUserId.equals(CR.toUserId)){
     throw new Error("A user cannot send the connectionRequest to himself");
  }
})

const connectionRequestModel = mongoose.model(" connections" , connectionRequest);

module.exports = connectionRequestModel ;

