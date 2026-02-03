const {Schema} = require("mongoose");
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new Schema({
    firstName : {
        type : String,
        required : true ,
        minLength : 4,
        trim : true
    },
    lastName : {
        type : String ,
        trim : true
    },
    emailId : {
        type : String ,
        lowercase : true ,
        required : true ,
        unique :true ,
        trim : true ,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email not found");
            }
        }
    },
    password : {
        type : String ,
        required : true , 
        minLength : 8 ,
    },
    age : {
        type : Number,  
        min : 18
    },
    gender : {
        type : String ,
        validate(value){
            if(!["male" , "female" , "others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        } ,
        lowercase : true
    },
    photoUrl : {
        type : String,
        default : "https://imgs.search.brave.com/up6RbxPKkEW3EICRFqCZPQFYn1I4Ob9uvDGJCPXWbJc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly81My5m/czEuaHVic3BvdHVz/ZXJjb250ZW50LW5h/MS5uZXQvaHViZnMv/NTMvW1VzZSUyMCgy/KS0yLndlYnA" ,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("The URL of the photo cannot be found");
            }
        }
    } ,
    about : {
       type : String ,
       default : "This is default description about the user"
    } ,
    skills : {
       type : [String]
    }
} , 
{
    timestamps : true
});

const User = mongoose.model("User", userSchema);

module.exports = User;