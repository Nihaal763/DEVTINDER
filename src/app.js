const express = require("express");

const app = express();
console.log(typeof(app));
app.listen(7777 , ()=>{
    console.log("Server has started successfully and is listening to you");
});
app.use("/Nihaal",(req,res)=>{
    res.send("Nihaal route");
})
app.use("/Pooja",(req,res)=>{
    res.send("Pooja route");
})
app.use((req , res)=> {
   res.send("Hello from the server to the client that is you");
})