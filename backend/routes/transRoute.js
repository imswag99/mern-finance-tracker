import express from "express";
import { addTransaction, getTransactions, updateTransaction, deleteTransaction } from "../controllers/transController.js";
import authMiddleware from '../middlewares/authMiddleware.js';


const transRouter = express.Router()
transRouter.post('/addTransaction', authMiddleware, addTransaction)
transRouter.get('/getTransactions', authMiddleware, getTransactions)
transRouter.put('/:id', authMiddleware, updateTransaction)
transRouter.delete('/:id', authMiddleware, deleteTransaction)



export default transRouter