import express from "express"
import nodemailer from "nodemailer"

const app=express();

app.use(express.json())

app.post('/api/email',async(req,res)=>{
    try {
        const {email}=req.body;
        const transporter=nodemailer.createTransport({
            service:"gmail",
      auth: {
        user: "tshukla025@gmail.com",
        pass: "urotjxhzjaaykjfx",
      },
    });
    
    const info = await transporter.sendMail({
        from: 'tshukla025@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      res.status(200).send({
        message:info.messageId
      })
    } catch (error) {
        console.log("error sending email");
        res.status(500).send({
            message:"Error sending email",error
          })
        
    }
   


})

app.listen(8080,()=>{console.log("Server started");
})

