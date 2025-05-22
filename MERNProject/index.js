import { log } from "console";
import express from "express";
import nodemailer from "nodemailer";

const app = express();

app.use(express.json());

app.post("/api/email", async (req, res) => {
  try {
    const { emails } = req.body;
    console.log('emails',emails);
    

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res.status(400).send({ message: "No recipient emails provided." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tshukla025@gmail.com",
        pass: "xkjzxhkibitpjuok",
      },
    });

    for (const email of emails) {
      await transporter.sendMail({
        from: "tshukla025@gmail.com",
        to: email,
        subject: "Hello!",
        text: `Hello dear`,
        html: `<b>Hello dear</b>`,
      });
    }

    res.status(200).send({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ message: "Error sending email" });
  }
});

app.listen(8080, () => {
  console.log("Server connected");
});
