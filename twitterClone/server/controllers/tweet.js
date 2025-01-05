import { Tweet } from "../models/tweet.js";
import { User } from "../models/users.js";

export async function createTweet(req,res){
    try {
        console.log("req.user",req.user);
        
        const { description } = req.body;
        const id=req.user;
        if (!description ) {
            return res.status(401).json({
                message: "Fields are required.",
                success: false
            });
        };
        const user = await User.findById(id).select("-password");

        await Tweet.create({
            description,
            userId:id,
            userDetails:user
        });
        return res.status(201).json({
            message:"Tweet created successfully.",
            success:true,
        })
    } catch (error) {
        res.status(500).json({
            message:"Error creating tweet",
            success:false,
            error:error.message
        })
    }
}

export const deleteTweet = async (req,res) => {
    try {
        const {id}  = req.params;
        await Tweet.findByIdAndDelete(id);
        return res.status(200).json({
            message:"Tweet deleted successfully.",
            success:true
        })
    } catch (error) {
        res.status(500).json({
            message:"Error deleting tweet",
            success:false,
            error:error.message
        })
    }
}

export async function likeOrDislike(req,res){
    try {
        const userId=req.user;
        const tweetId=req.params.id;
        console.log(tweetId);
        
        const tweet=await Tweet.findById(tweetId);
        console.log("tweet",tweet);
        
    
        if(tweet.like.includes(userId)){
            await Tweet.findByIdAndUpdate(tweetId,{$pull:{like:userId}})
            return res.status(200).send({
                message:"You liked a tweet",
                success:true,
            })
        }
        else{
            await Tweet.findByIdAndUpdate(tweetId,{$push:{like:userId}})
            return res.status(200).send({
                message:"You disliked a tweet",
                success:true,
            })
        }    
    } catch (error) {
        res.status(500).json({
            message:"Error liking/disliking tweet",
            success:false,
            error:error.message
        })
    }
    
}

export async function getAllTweets(req,res){
    console.log("reached here");
    
    try {
        const userId=req.user;
        const user=await User.findById(userId)
        const userTweet=await Tweet.find({userId})
        const followingTweets=await Promise.all(user.following.map((id)=>(
            Tweet.find({userId:id})
        )))
        return res.status(200).send({tweets:userTweet.concat(...followingTweets)})   
    } catch (error) {
        res.status(500).json({
            message:"Error getting all the tweets",
            success:false,
            error:error.message
        })
    }
    
}
export async function getFollowingTweets(req,res){
    
    try {
        const userId=req.user;
        const user=await User.findById(userId)
        const followingTweets=await Promise.all(user.following.map((id)=>(
            Tweet.find({userId:id})
        )))
        return res.status(200).send({tweets:[].concat(...followingTweets)})   
    } catch (error) {
        res.status(500).json({
            message:"Error getting following tweets",
            success:false,
            error:error.message
        })
    }
    
}