import express from "express"
import multer from "multer";
import addImage from "../controllers/addImage.js";
import path from "path";
import { getBooks } from "../controllers/books.js";

const router=express.Router();
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.resolve('../server/uploads'))
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       const extension=path.extname(file.originalname);
//       cb(null, file.fieldname + '-' + uniqueSuffix +extension)
//     }
//   })
  
//   const upload = multer({ storage: storage })

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.get('/get/books',getBooks);
router.post('/add',upload.single("image"),addImage);

export default router;