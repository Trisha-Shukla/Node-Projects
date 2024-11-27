const express =require("express");
const axios=require("axios");
require("dotenv").config();



const app=express();

app.get("/random-images",async(req,res)=>{
    
    const apiKey = process.env.API_KEY;
    console.log(apiKey);
    
    console.log("Request recieved");

    try {
        const respose=await axios.get(`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=1`);
        console.log(respose.data[0].urls.regular);
        const imageLink=[{
            url:respose.data[0].urls.regular
        }]
        res.json(imageLink)
        
    } catch (error) {
        console.error("Error fetching Images:", error.message);
        res.status(500).json({ error: "Failed to fetch Images" }); 
    }
    
    
})

app.listen(8080,()=> console.log("Server running at posrt 8080")
)