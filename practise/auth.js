import express from 'express'
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'

const app=express()
const jsonToken="abcd1234ABCD"
app.use(express.json());
app.use(cookieParser());

app.post('/token',async(req,res)=>{
    try {
        const {email}=req.body
        const token=await jwt.sign({email},jsonToken,{expiresIn:"1d"})
        res.status(200).cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:24 * 60 * 60 * 1000,
        }).send({
            meassage:"success"
        })
    } catch (error) {
        res.status(500).send({message:"Error"})
    }
    
})

app.post('/test',async(req,res)=>{
    try {
        const {email}=req.body;
        const {token}=req.cookies;
        const decode= await jwt.verify(token,jsonToken)
        console.log(decode);
        if(decode.email === email){
            res.status(200).send({
                message:"Success"
            })
        }
        
    } catch (error) {
        console.log("Error");
        
    }
    

})

app.listen(8080,()=>{console.log("Connected to server");
})