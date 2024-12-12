import express from "express"
import {login, registerUser} from "../controllers/registerUser.js";

const userRouter=express.Router();




userRouter.post('/register',registerUser);
userRouter.post('/login',login);

export default userRouter;