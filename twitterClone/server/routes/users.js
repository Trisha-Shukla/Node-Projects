import {Router}  from 'express'
import { bookmark, follow, getMyProfile, getOtherUsers, getUser, login, logout, register } from '../controllers/users.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';


const userRouter=Router();

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/logout",logout)
userRouter.put("/bookmark/:id",isAuthenticated,bookmark)
userRouter.get("/profile/:id",isAuthenticated,getMyProfile)
userRouter.get("/users",isAuthenticated,getOtherUsers)
userRouter.get("/user",isAuthenticated,getUser)
userRouter.post("/follow/:id",isAuthenticated,follow)

export default userRouter