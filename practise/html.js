import express from 'express'
import {fileURLToPath} from 'url'
import path from 'path';
import multer from 'multer';




const app=express()

app.use(express.json());
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve("uploads"))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const ext=path.extname(file.originalname)
      cb(null, file.fieldname + '-' + uniqueSuffix+'-'+ext)
    }
  })
  
  const upload = multer({ storage: storage })




app.post('/add',upload.single("image"),(req,res)=>{
    try {
        console.log("Reaches");
        
        console.log(req.file,"file")
        res.status(200).send({
            message:req.file.path
        })
    } catch (error) {
        console.log("Error");
        
    }
});

app.listen(8080,()=>{console.log("Connected to server");
})