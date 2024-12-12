import { sendVerificationEmail } from "../middleware/verification.js";
import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config";


export const verifyToken=async(req,res)=>{
  console.log("verify token reached");
  
    const {token}=req.body;
    try {
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        const user=await Users.findOneAndUpdate({email:decoded.userEmail},{isEmailVerified:true});
        if(!user){
          return  res.status(404).send({message:"User doesn't exist"})
        }

        return res.status(200).send({message:"User Verified Succesfully!!"})
        
    } catch (error) {
      console.log("token expired");
      
      return  res.status(404).send({message:"token expired"})
        
    }
    
}

// http://localhost:5173//verify-email?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ0c2h1a2xhMDI1QGdtYWlsLmNvbSIsImlhdCI6MTczMzU1OTQ2MywiZXhwIjoxNzMzNTYzMDYzfQ.1ZDZdtET-k9PFWIqZQ3BQLsPXVzU39meAiXcdojVCck