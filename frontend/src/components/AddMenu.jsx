import axios from "axios";
import { useContext } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { UserContext } from "../context/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";

const AddMenu = ({
    setShowAddMenu,
    loadTransactionData,
    singleTransaction,
    setSingleTransaction,
}) => {
    const navigate = useNavigate();
    const { url, setCurrPage } = useContext(UserContext);
    const [data, setData] = useState({
        title: singleTransaction?.title || "",
        amount: singleTransaction?.amount || "",
        date: singleTransaction?.date || "",
        category: singleTransaction?.category || "",
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const addNewTransaction = async (e) => {
        e.preventDefault();

        const response = await axios.post(
            `${url}/api/transaction/addTransaction`,
            {
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }
        );
        loadTransactionData();
        if (response.data.success) {
            toast.success(response.data.message);
            setData({
                title: "",
                amount: "",
                date: "",
                category: "",
            });
            setShowAddMenu(false);
            setCurrPage("Transactions");
            navigate("/transactions");
        } else {
            toast.error(response.data.message);
        }
    };

    const editTransaction = async (e, id) => {
        e.preventDefault();

        const response = await axios.put(`${url}/api/transaction/${id}`, {
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        loadTransactionData();
        if (response.data.success) {
            toast.success(response.data.message);
            setData({
                title: "",
                amount: "",
                date: "",
                category: "",
            });
            setShowAddMenu(false);
            setSingleTransaction(null);
            setCurrPage("Transactions");
            navigate("/transactions");
        } else {
            toast.error(response.data.message);
        }
    };

    const handleGoBackBtn = () => {
        setSingleTransaction(null);
        setShowAddMenu(false);
    };

    return !singleTransaction ? (
        <div className="w-full text-white text-lg">
            <button
                onClick={() => setShowAddMenu(false)}
                className="w-[20%] bg-primary rounded-2xl py-3 px-1 cursor-pointer shadow-sm shadow-shadow flex justify-center items-center gap-3 max-sm:w-full"
            >
                <FaArrowLeftLong />
                Go Back
            </button>
            <form
                onSubmit={addNewTransaction}
                className="w-full mt-10 flex flex-col gap-10 justify-center"
            >
                <div className="w-full flex flex-col gap-3 justify-center">
                    <h1 className="text-xl">Title</h1>
                    <input
                        className="w-[50%] bg-transparent outline-0 border-2 border-primary rounded-2xl py-2 px-3 max-sm:w-full"
                        type="text"
                        required
                        onChange={onChangeHandler}
                        name="title"
                        value={data.title}
                    />
                </div>
                <div className="w-full flex flex-col gap-3 justify-center">
                    <h1 className="text-xl">Amount</h1>
                    <input
                        className="w-[50%] bg-transparent outline-0 border-2 border-primary rounded-2xl py-2 px-3 max-sm:w-full"
                        type="number"
                        required
                        onChange={onChangeHandler}
                        name="amount"
                        value={data.amount}
                    />
                </div>
                <div className="w-full flex flex-col gap-3 justify-center">
                    <h1 className="text-xl">Date</h1>
                    <input
                        className="w-[50%] bg-transparent outline-0 border-2 border-primary rounded-2xl py-2 px-3 max-sm:w-full"
                        type="date"
                        required
                        onChange={onChangeHandler}
                        name="date"
                        value={data.date}
                    />
                </div>
                <div className="w-full flex flex-col gap-3 justify-center">
                    <h1 className="text-xl">Category</h1>
                    <select
                        className="w-[20%] bg-transparent outline-0 border-2 border-primary rounded-2xl py-2 px-3 text-primary max-sm:w-full"
                        required
                        onChange={onChangeHandler}
                        name="category"
                        value={data.category}
                    >
                        <option selected disabled hidden value="">
                            Choose here
                        </option>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-[20%] bg-primary rounded-2xl py-3 px-1 cursor-pointer shadow-sm shadow-shadow max-sm:w-full"
                >
                    Submit
                </button>
            </form>
        </div>
    ) : (
        <div className="w-full text-white text-lg">
            <button
                onClick={handleGoBackBtn}
                className="w-[20%] bg-primary rounded-2xl py-3 px-1 cursor-pointer shadow-sm shadow-shadow flex justify-center items-center gap-3 max-sm:w-full"
            >
                <FaArrowLeftLong />
                Go Back
            </button>
            <form
                onSubmit={(e) => editTransaction(e, singleTransaction._id)}
                className="w-full mt-10 flex flex-col gap-10 justify-center"
            >
                <div className="w-full flex flex-col gap-3 justify-center">
                    <h1 className="text-xl">Title</h1>
                    <input
                        className="w-[50%] bg-transparent outline-0 border-2 border-primary rounded-2xl py-2 px-3 max-sm:w-full"
                        type="text"
                        required
                        onChange={onChangeHandler}
                        name="title"
                        value={data.title}
                    />
                </div>
                <div className="w-full flex flex-col gap-3 justify-center">
                    <h1 className="text-xl">Amount</h1>
                    <input
                        className="w-[50%] bg-transparent outline-0 border-2 border-primary rounded-2xl py-2 px-3 max-sm:w-full"
                        type="number"
                        required
                        onChange={onChangeHandler}
                        name="amount"
                        value={data.amount}
                    />
                </div>
                <div className="w-full flex flex-col gap-3 justify-center">
                    <h1 className="text-xl">Date</h1>
                    <input
                        className="w-[50%] bg-transparent outline-0 border-2 border-primary rounded-2xl py-2 px-3 max-sm:w-full"
                        type="date"
                        required
                        onChange={onChangeHandler}
                        name="date"
                        value={moment(data.date).format("YYYY-MM-DD")}
                    />
                </div>
                <div className="w-full flex flex-col gap-3 justify-center">
                    <h1 className="text-xl">Category</h1>
                    <select
                        className="w-[20%] bg-transparent outline-0 border-2 border-primary rounded-2xl py-2 px-3 text-primary max-sm:w-full"
                        required
                        onChange={onChangeHandler}
                        name="category"
                        value={data.category}
                    >
                        <option selected disabled hidden value="">
                            Choose here
                        </option>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-[20%] bg-primary rounded-2xl py-3 px-1 cursor-pointer shadow-sm shadow-shadow max-sm:w-full"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddMenu;
