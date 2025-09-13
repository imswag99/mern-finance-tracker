import transModel from "../models/transModel.js"
import { Types } from "mongoose";

const getDashboardData = async(req, res) => {
    try {
        const userId = req.userId;
        const userObjectId = new Types.ObjectId(String(userId));
        const totalIncome = await transModel.aggregate([
            {$match: {userId: userObjectId, category: "Income"}},
            {$group: {_id: null, total: {$sum: "$amount"}}}
        ]);

        // console.log("totalIncome", totalIncome);

        
        const totalExpense = await transModel.aggregate([
            {$match: {userId: userObjectId, category: "Expense"}},
            {$group: {_id: null, total: {$sum: "$amount"}}}
        ]);


        const last30DaysIncomeTransactions = await transModel.find({
            userId,
            category: "Income",
            date: {$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
        }).sort({ date: -1 });

        const incomeLast30Days = last30DaysIncomeTransactions.reduce(
            (sum, transaction) => (sum + transaction.amount), 0
        );



        const last30DaysExpenseTransactions = await transModel.find({
            userId,
            category: "Expense",
            date: {$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
        }).sort({ date: -1 });

        const expenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => (sum + transaction.amount), 0
        );



        const lastTransactions = [
            ...(await transModel.find({userId}).sort({date: -1}).limit(5))
        ].sort((a, b) => b.date - a.date);


        const dashboardData = {
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysIncome: {
                total: incomeLast30Days,
                transactions: last30DaysIncomeTransactions
            },
            last30DaysExpense: {
                total: expenseLast30Days,
                transactions: last30DaysExpenseTransactions
            },
            recentTransactions: lastTransactions
        }
        res.json({success: true, dashboardData})
    } catch (error) {
        console.log(error);        
        res.json({success: false, message: "error"})
    }
}

export {getDashboardData}