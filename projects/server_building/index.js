const http=require("node:http")

const server=http.createServer((req,res)=>{
    console.log("Request recieved",req.url);
    const data=[{id:1,name:"Trisha"},{id:2, name:"Rohini"}]
    res.end(JSON.stringify(data))
    
});

server.listen(8080, ()=> console.log("Server is up and running"));
