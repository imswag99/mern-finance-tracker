import transModel from "../models/transModel.js";

const addTransaction = async (req, res) => {
    try {
        const userId = req.userId;
        const { title, amount, date, category } = req.body;

        const newTransaction = new transModel({
            userId,
            title,
            amount,
            date: new Date(date),
            category
        });
        await newTransaction.save();
        res.json({ success: true, message: "Transaction added successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const getTransactions = async (req, res) => {
    try {
        const userId = req.userId;
        const transactions = await transModel.find({userId}).sort({ date: -1 });
        res.json({ success: true, transactions });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const updateTransaction = async (req, res) => {
    try {
        const transId = req.params.id;
        const { title, amount, date, category } = req.body;
        await transModel.findByIdAndUpdate(transId, {
            title,
            amount,
            date,
            category
        }, {new: true})
        res.json({ success: true, message: "Transaction updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const deleteTransaction = async (req, res) => {
    try {
        const transId = req.params.id;
        await transModel.findByIdAndDelete(transId);
        res.json({ success: true, message: "Transaction deleted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addTransaction, getTransactions, updateTransaction, deleteTransaction };
