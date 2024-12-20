import express, { json, urlencoded } from "express"
import { connectToDB } from "./db/connection.js"
import cors from 'cors'
import "dotenv/config"
import blogRouter from "./routes/blogRouter.js";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter.js";
import commentRouter from "./routes/commentRoute.js";
// import router from "./routes/router.js";
// import userRouter from "./routes/UserRouter.js";
// import authRouter from "./routes/AuthRouter.js";

const app=express();
const port=process.env.PORT;
app.use(json());
app.use(urlencoded({}));


const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: ["Content-Type", "Authorization"],
  };
  
  app.use(cors(corsOptions));
  app.use(cookieParser());
app.use("/api/blog",blogRouter)
app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/comment",commentRouter)
// app.use("/api/auth",authRouter)

await connectToDB();
app.listen(port,()=>{console.log("Connected to Server");
})