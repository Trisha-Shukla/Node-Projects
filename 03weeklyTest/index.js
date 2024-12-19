
import path from 'path'
import express, { json, urlencoded } from "express"
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

// import blogRouter from "./routes/blogRouter.js";
// import userRouter from "./routes/userRouter.js";
// import router from "./routes/router.js";
// import userRouter from "./routes/UserRouter.js";
// import authRouter from "./routes/AuthRouter.js";

const app=express();
const port=3000;
app.use(json());
app.use(bodyParser.urlencoded({extended:true}));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// app.use(cors({origin:"http://localhost:5173"}))
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "index.html"));
})

app.post("/submit",(req,res)=>{
    const {name,email,message}=req.body;
    console.log(req.body);
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "tshukla025@gmail.com",
          pass: "qfhyswcpbitsdrgn",
        },
      });

  const mailOptions = {
    from: "tshukla025@gmail.com",
    to: email,
    subject: `Message to ${name}`,
    html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Hello, ${name}</h2>
            <p>${message}</p>
            
          </div>
        `,
  };

   transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
        res.status(500).send({message:"Email not send "+error})
    }
    else{
        console.log(info)
        res.status(200).send({message:"Email sent "})
    }
  });

})
// app.use("/api/user",userRouter)
// app.use("/api/auth",authRouter)

// await connectToDB();
app.listen(port,()=>{console.log("Connected to Server");
})