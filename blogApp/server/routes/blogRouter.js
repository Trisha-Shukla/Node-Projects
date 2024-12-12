import express from "express";
import {
  
  getBlog,
  getBlogs,
  deleteBlog,
  addBlog,
  updateBlog,
  
} from "../controller/blogController.js";
import multer from "multer";




const blogRouter = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

blogRouter.post("/add", upload.single("image"), addBlog);
blogRouter.get("/get", getBlogs);
blogRouter.get("/get/:id", getBlog);
blogRouter.delete("/delete/:id", deleteBlog);
blogRouter.put("/update/:id", updateBlog);

export default blogRouter;