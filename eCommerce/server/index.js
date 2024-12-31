import express, { json, urlencoded } from "express"
import { connectToDB } from "./db/connection.js";
import cors from 'cors'
import "dotenv/config"
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import cartRouter from "./routes/cartRouter.js";
import couponRouter from "./routes/couponRouter.js";



const app=express();
const port=process.env.PORT;
app.use(json());
app.use(urlencoded({}));


const corsOptions = {
    origin: "https://geekecommerce.onrender.com",
    credentials: true,  //This allows the server to accept cookies
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: ["Content-Type", "Authorization"],
  };
  
  app.use(cors(corsOptions));
  app.use(cookieParser());
app.use("/api/product",productRouter)
app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/cart",cartRouter)
app.use("/api/coupon",couponRouter)


await connectToDB();
app.listen(port,()=>{console.log("Connected to Server");
})