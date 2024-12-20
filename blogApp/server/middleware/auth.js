import jwt from "jsonwebtoken";
import "dotenv/config"
import User from "../model/userModel.js";

export const protectRoute=async(req,res,next)=>{
    try {
        console.log("reached protected route");
        console.log(req.cookies);
        
        
        const token=req.cookies.token;
        console.log(token);
        
        if(!token){
            res.status(403).send({message: "Authentication denied,no token found"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        
        const user=await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).send({message:"Invalid user"});
        }
        req.user=user;
        next();
        
    } catch (error) {
        // res.status(500).send({message:"Error with authentication"+error});
    }
}