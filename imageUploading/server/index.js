import express, { json, urlencoded } from "express"
import { connectToDB } from "./db/connection.js"
import cors from 'cors'
import "dotenv/config"
import router from "./routes/router.js";
import userRouter from "./routes/UserRouter.js";
import authRouter from "./routes/AuthRouter.js";

const app=express();
const port=process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({}));

await connectToDB();

app.listen(port,()=>{console.log("Connected to Server");
})
app.use(cors({origin:"http://localhost:5173"}))
app.use("/api",router)
app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)