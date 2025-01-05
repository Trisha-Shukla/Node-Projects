import express from "express"
import "dotenv/config"
import userRouter from "./routes/users.js";
import { connectToDB } from "./db/database.js";
import tweetRouter from "./routes/tweet.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app=express();
const PORT=process.env.PORT
const corsOption={
    origin:"https://twitter-clone-4d67.onrender.com",
    credentials:true
}

app.use(express.urlencoded({
    extended:true,
}))

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption))

app.use("/api/v1/user",userRouter)
app.use("/api/v1/tweet",tweetRouter)
await connectToDB();

app.listen(PORT,()=>{
console.log(`App started at ${PORT}` );

})