const express =require("express");
const axios=require("axios");
require("dotenv").config();



const app=express();

app.get("/random-jokes",async(req,res)=>{
    
    const apiKey = process.env.API_KEY;
    console.log(apiKey);
    
    console.log("Request recieved");

    try {
        const respose=await axios.get("https://api.api-ninjas.com/v1/dadjokes",{
            headers:{
                'X-Api-Key':apiKey
            }});
        console.log(respose.data);
        res.json(respose.data)
        
    } catch (error) {
        console.error("Error fetching jokes:", error.message);
        res.status(500).json({ error: "Failed to fetch jokes" }); // Send error response
    }
    
    
})

app.listen(8080,()=> console.log("Server running at posrt 8080")
)