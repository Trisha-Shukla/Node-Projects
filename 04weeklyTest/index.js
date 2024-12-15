import express, { json, urlencoded } from "express"
import { connectToDB } from "./db/connection.js"
import fileRouter from "./routes/fileSharing.js";

const app=express();
const port=3000;
app.use(json());
app.use(urlencoded({}));

app.use("/api",fileRouter)

await connectToDB();
app.listen(port,()=>{console.log("Connected to Server");
})