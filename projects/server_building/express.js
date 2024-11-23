const express=require("express");

const app=express();

app.get("/todos",(req,res)=>{
        console.log("todo req recieved");
        const data=[{id:1,name:"Trisha"},{id:2, name:"Rohini"}]
        res.json(data)
})
app.get("/user",(req,res)=>{
        console.log("user req recieved");
        res.end("user api")
})

app.listen(8080,()=>{
    console.log("Server created using express");
    
})