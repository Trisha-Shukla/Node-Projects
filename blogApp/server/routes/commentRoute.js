import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { createComment, deleteComment, updateComment } from "../controller/commentControllers.js";


const commentRouter = express.Router();

commentRouter.post("/create", protectRoute, createComment);
commentRouter.put("/update/:id", protectRoute, updateComment);
commentRouter.delete("/delete/:id", protectRoute, deleteComment);

export default commentRouter;