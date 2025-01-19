import express from "express";
import nodemailer from "nodemailer"

const app=express();

app.use(express.json());

app.post('/api/email',async(req,res)=>{
    try {
        const {email,name}=req.body;
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
              user: "tshukla025@gmail.com",
              pass: "xkjzxhkibitpjuok",
            },
          });

          const info = await transporter.sendMail({
            from: 'tshukla025@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: `Hello ${name}`, // plain text body
            html: `<b>Hello ${name}</b>`, // html body
          });

          res.status(200).send({
            message:"Email sent succesfully!!"
          })
        
    } catch (error) {
        res.status(500).send({
            message:"Error sending email"
          })
    }

})

app.listen(8080,()=>{console.log("Server connected");
})