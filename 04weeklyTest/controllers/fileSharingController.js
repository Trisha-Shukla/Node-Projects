import multer from "multer";
import path from 'path'
import { fileURLToPath } from "url";
import fs from "fs";
import FileSharing from "../models/fileSharingModel.js";
import nodemailer from 'nodemailer'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderPath = path.join(__dirname, "../", "uploads");
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, folderPath)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension=path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix +extension)
    }
  })
  
  const upload = multer({ storage: storage }).single("attachments")

  export async function uploadFile(req,res){
    upload(req, res, async(err) => {
        if (err) {
            return res.status(500).json({ message: "File upload failed", error: err.message });
        }
        const file=req.file;
        console.log(file);
        
        const newFile=new FileSharing({
            fileName:file.filename,
            path:file.path,
            size:file.size
        })

        const newInsertFile=await newFile.save();
        res.status(200).json({ message: "File uploaded successfully", file: newInsertFile });
    });
  }

  export async function geterateLink(req,res){
    try {
        const uuid=req.params.uuid;
        const file=await FileSharing.findById(uuid);
        console.log(file);
        if(file){
            const downloadLink=`http://localhost:3000/api/fileSharing/download/${uuid}`;
            res.status(201).send({
                url:downloadLink
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message:"Error generating link"+error
        })
    }

    
  }

  export async function downloadFile(req,res){
    try {
        const uuid=req.params.uuid;
            const file=await FileSharing.findById(uuid);
            console.log(file);
            if(file){
                const filepath=file.path;
                res.download(filepath);
                
            }
        
    } catch (error) {
        res.status(500).send({
            message:"Error downloading file"+error
        })
    }
  }


  export async function sendEmail(req, res) {
      try {
          const { uuid, emailFrom, emailTo } = req.body;
  
          // Find file using UUID
          const file = await FileSharing.findById(uuid);
          if (!file) {
              return res.status(404).send({ message: "File not found" });
          }
  
          const downloadLink = `http://localhost:3000/api/fileSharing/download/${uuid}`;
  
          // Setup Nodemailer transporter
          const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                  user: "tshukla025@gmail.com", // Use environment variables
                  pass: "qfhyswcpbitsdrgn", // Use environment variables
              },
          });
  
          // Email options
          const mailOptions = {
              from: emailFrom,
              to: emailTo,
              subject: "Download Link",
              html: `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                      <h2>File Download Link</h2>
                      <p>Thank you for using our service. Click the link below to download your file:</p>
                      <a href="${downloadLink}" style="color: blue; text-decoration: underline;">Download File</a>
                  </div>
              `,
          };
  
          // Send email
          await transporter.sendMail(mailOptions);
  
          res.status(200).send({ message: "Email sent successfully!" });
      } catch (error) {
          res.status(500).send({
              message: "Error sending email",
              error: error.message,
          });
      }
  }
  