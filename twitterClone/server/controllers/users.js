import bcryptjs from "bcryptjs";
import { User } from "../models/users.js";
import jwt from "jsonwebtoken";

export async function register(req, res) {
    try {
        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            return res.status(401).send({
                message: "All fields are required!",
                success: false,
            });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(401).send({
                message: "User already exists",
                success: false,
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 12);

        await User.create({
            name,
            email,
            username,
            password: hashedPassword,
        });

        res.status(201).send({
            message: "Account created successfully",
            success: true,
        });
    } catch (error) {
        console.error("Error in register:", error.message);
        res.status(500).send({
            message: "Error registering user",
            success: false,
            error: error.message,
        });
    }
}

export async function login(req,res){
    const {username,password}=req.body;

    if ( !username || !password) {
        return res.status(401).send({
            message: "All fields are required!",
            success: false,
        });
    }

    const user=await User.findOne({username})
    if(!user){
        return res.status(401).send({
            message: "No such user exist!",
            success: false,
        });
    }
    user
    const checkPass=await bcryptjs.compare(password,user.password);
    if(!checkPass){
        return res.status(401).send({
            message: "Incorrect Password!",
            success: false,
        });
    }

    const token = await jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: "1d" });

        return res.status(201).cookie("token", token, { 
            httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict", // Prevent CSRF
        maxAge: 24 * 60 * 60 * 1000, // 1 day
         }).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true
        })
}

export function logout(req,res){
    return res.cookie("token","",{expiresIn : new Date(Date.now())}).send({
        message:"Logout Succesfully",
        success:true,
    })
}

export async function bookmark(req,res){
    try {
        const userId=req.user;
        const tweetId=req.params.id;
        console.log(tweetId);
        
        const user=await User.findById(userId);
        console.log("tweet",user);
        
    
        if(user.bookmarks.includes(tweetId)){
            await User.findByIdAndUpdate(userId,{$pull:{bookmarks:tweetId}})
            return res.status(200).send({
                message:"User unbookmarked a Tweet",
                success:true,
            })
        }
        else{
            await User.findByIdAndUpdate(userId,{$push:{bookmarks:tweetId}})
            return res.status(200).send({
                message:"User bookmarked a Tweet",
                success:true,
            })
        }    
    } catch (error) {
        res.status(500).json({
            message:"Error bookmarking tweet",
            success:false,
            error:error.message
        })
    }
    
}

export async function getMyProfile(req,res){
    try {
        const userId=req.params.id;
    const user=await User.findById(userId).select("-password");
    res.status(200).send({user})
    } catch (error) {
        res.status(500).json({
            message:"Error getting User Profile",
            success:false,
            error:error.message
        })
    }
    
}

export async function getOtherUsers(req,res){
    try {
        const userId=req.user;
        const user=await User.find({_id:{$ne:userId}}).select("-password")

        if(!user){
            return res.status(401).send({
                message:"No users found!!",
                success:false
            })          
            
        }

        res.status(200).send({user})
        
    } catch (error) {
        res.status(500).json({
            message:"Error getting Users",
            success:false,
            error:error.message
        })
    }
}

export async function follow(req,res){
    try {
        const userId=req.user;
        const followId=req.params.id;
        const user=await User.findById(userId)
        const follow=await User.findById(followId)
    
        if(!user.following.includes(followId)){
            await user.updateOne({$push:{following:followId}})
            await follow.updateOne({$push:{followers:userId}})
            return res.status(200).send({
                message:`${user.name} started following ${follow.name}`,
                success:true
            })
        }
        else{
            await user.updateOne({$pull:{following:followId}})
            await follow.updateOne({$pull:{followers:userId}})
            return res.status(200).send({
                message:`${user.name}  unfollowed ${follow.name}`,
                success:true
            })
        }
    
          
    } catch (error) {
        res.status(500).json({
            message:"Error Following Users",
            success:false,
            error:error.message
        })
    }
    
}

export async function getUser(req,res){
    try {
        const userId=req.user;
        console.log(userId);
        
        const user= await User.findById(userId).select("-password");
        console.log(user);
        
        res.status(200).send({user})
        
    } catch (error) {
        res.status(500).json({
            message:"Error getting Users",
            success:false,
            error:error.message
        })
    }
}
