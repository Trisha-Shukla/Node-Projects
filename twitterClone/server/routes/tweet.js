import {Router}  from 'express'
import { createTweet, deleteTweet, getAllTweets, getFollowingTweets, likeOrDislike } from '../controllers/tweet.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';



const tweetRouter=Router();

tweetRouter.post("/create",isAuthenticated,createTweet)
tweetRouter.delete("/delete/:id",isAuthenticated,deleteTweet)
tweetRouter.put("/like/:id",isAuthenticated,likeOrDislike)
tweetRouter.get("/get-all-tweets",isAuthenticated,getAllTweets)
tweetRouter.get("/get-following-tweets",isAuthenticated,getFollowingTweets)


export default tweetRouter