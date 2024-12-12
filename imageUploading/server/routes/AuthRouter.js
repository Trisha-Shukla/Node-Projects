import express from "express"
import { verifyToken } from "../controllers/verifyUser.js";


const authRouter=express.Router();

authRouter.post('/verify-token',verifyToken);

export default authRouter;