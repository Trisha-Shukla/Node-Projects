import express from "express"
import { connectingToDB } from "./db/connection.js";
import doctorRouter from "./router/doctor.js";
import cors from'cors'
import userRouter from "./router/user.js";
import cookieParser from "cookie-parser";

const app=express();
const corsOptions = {
    // origin: "https://geekecommerce.onrender.com",
    origin: "http://localhost:3000",
    credentials: true,  //This allows the server to accept cookies
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: ["Content-Type", "Authorization"],
  };
  
  app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());
app.use('/api', doctorRouter);
app.use('/api', userRouter);

await connectingToDB();
app.listen(8080,()=>{console.log("Connected to server");
})