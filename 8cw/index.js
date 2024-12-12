import express, { json, urlencoded } from "express"
import { connectToDB } from "./db/connection.js"
import "dotenv/config"
import jobRouter from "./routes/jobRoutes.js";
// import blogRouter from "./routes/blogRouter.js";
// import userRouter from "./routes/userRouter.js";
// import router from "./routes/router.js";
// import userRouter from "./routes/UserRouter.js";
// import authRouter from "./routes/AuthRouter.js";

const app=express();
const port=process.env.PORT;
app.use(json());
app.use(urlencoded({}));


// app.use(cors({origin:"http://localhost:5173"}))
app.use("/api/job",jobRouter)
// app.use("/api/user",userRouter)
// app.use("/api/auth",authRouter)

await connectToDB();
app.listen(port,()=>{console.log("Connected to Server");
})