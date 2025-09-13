import express from "express";
import { getDashboardData } from "../controllers/dashboardController.js";
import authMiddleware from '../middlewares/authMiddleware.js';


const dashboardRouter = express.Router()
dashboardRouter.get('/getDashboardData', authMiddleware, getDashboardData)



export default dashboardRouter