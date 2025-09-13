import express from "express";
import { login, register, getUserInfo, logout } from "../controllers/userController.js";
import authMiddleware from '../middlewares/authMiddleware.js';


const userRouter = express.Router()
userRouter.post('/login', login)
userRouter.post('/register', register)
userRouter.post('/logout', logout)
userRouter.get('/getUser', authMiddleware, getUserInfo)



export default userRouter