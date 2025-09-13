import mongoose from "mongoose";

var transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    category: {
        type: String,
        required: true,
    },
});

const transactionModel =
    mongoose.models.transaction ||
    mongoose.model("transaction", transactionSchema);
export default transactionModel;
