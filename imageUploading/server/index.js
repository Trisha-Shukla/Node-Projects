import express from "express"
import { connectToDB } from "./db/connection.js"
import cors from 'cors'
import "dotenv/config"
import router from "./routes/router.js";

const app=express();
const port=process.env.PORT;

await connectToDB();

app.listen(port,()=>{console.log("Connected to Server");
})
app.use(cors({origin:"http://localhost:5173"}))
app.use("/api",router)