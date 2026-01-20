const mongoose = require("mongoose");

const connectDB = async() =>{
    await mongoose.connect ("mongodb+srv://nihaalkumar_db_user:MjHWiga1RpCl2k8z@namastenode.ciaen66.mongodb.net/DEVTINDER");
}

module.exports = connectDB;
