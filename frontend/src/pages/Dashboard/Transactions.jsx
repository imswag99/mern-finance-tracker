import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import moment from "moment";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import AddMenu from "../../components/AddMenu";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";
import CustomLineChart from "../../components/CustomLineChart";

const Transactions = () => {
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [allTransactions, setAllTransactions] = useState(null);
    const [singleTransaction, setSingleTransaction] = useState(null);
    const [ready, setReady] = useState(false);
    const { url, setCurrPage } = useContext(UserContext);
    // const navigate = useNavigate();
    const loadTransactionData = async () => {
        await axios
            .get(`${url}/api/transaction/getTransactions`, {
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                if (response.data.success) {
                    setAllTransactions(response.data.transactions);
                    setReady(true);
                }
            });
    };

    useEffect(() => {
        loadTransactionData();
    }, []);

    const handleDelete = async (id) => {
        const response = await axios.delete(`${url}/api/transaction/${id}`, {
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        });
        await loadTransactionData();
        if (response.data.success) {
            toast.success(response.data.message);
            setCurrPage("Transactions");
        } else {
            toast.error(response.data.message);
        }
    };

    const handleEdit = (transaction) => {
        setSingleTransaction(transaction);
        setShowAddMenu(true);
    };

    return (
        ready && (
            <div className="w-[100vw] h-[100vh]">
                <Navbar />
                <div className="w-full flex">
                    <Sidebar />
                    <div className="flex-1 py-5 px-10 flex flex-col gap-10 max-sm:px-5">
                        {showAddMenu && (
                            <AddMenu
                                loadTransactionData={loadTransactionData}
                                setShowAddMenu={setShowAddMenu}
                                singleTransaction={singleTransaction}
                                setSingleTransaction={setSingleTransaction}
                            />
                        )}
                        {!showAddMenu && (
                            <>
                                <button
                                    onClick={() => setShowAddMenu(true)}
                                    className="w-[20%] bg-primary text-white text-lg rounded-2xl py-3 px-1 cursor-pointer shadow-sm shadow-shadow max-sm:w-full"
                                >
                                    + Add Transaction
                                </button>
                                <div className="w-full p-5 shadow-md shadow-shadow rounded-xl">
                                    <h1 className="text-xl text-white pl-5 mb-1">
                                        Transaction Overview
                                    </h1>
                                    <p className="text-sm text-gray-400 pl-5 mb-10">
                                        Line graph showing all the transactions
                                        of the past
                                    </p>
                                    <CustomLineChart
                                        allTransactions={allTransactions}
                                    />
                                </div>
                                <div className="w-full p-5 shadow-md shadow-shadow rounded-xl">
                                    <h1 className="text-xl text-white pl-5">
                                        Transaction Details
                                    </h1>
                                    <p className="text-sm text-gray-400 pl-5 mb-5">
                                        Table showing details of all the
                                        transactions
                                    </p>
                                    <div className="w-full text-white grid grid-cols-6 p-5 text-xl uppercase font-semibold max-sm:font-normal max-sm:text-xs max-sm:gap-x-10">
                                        <h1>Title</h1>
                                        <h1>Date</h1>
                                        <h1>Amount</h1>
                                        <h1>Category</h1>
                                        <h1>Edit</h1>
                                        <h1>Delete</h1>
                                    </div>
                                    {allTransactions.map((transaction) => (
                                        <div
                                            key={transaction._id}
                                            className="w-full text-white grid grid-cols-6 gap-7 p-5 text-md max-sm:font-normal max-sm:text-sm max-sm:gap-x-15"
                                        >
                                            <h1>{transaction.title}</h1>
                                            <h1>
                                                {moment(
                                                    transaction.date
                                                ).format("DD MMM YYYY")}
                                            </h1>
                                            <div
                                                className={
                                                    transaction.category ===
                                                    "Income"
                                                        ? "w-[4rem] h-[2rem] flex items-center justify-center gap-2 bg-green-100 text-green-700 text-md rounded-md"
                                                        : "w-[4rem] h-[2rem] flex items-center justify-center gap-2 bg-red-100 text-red-700 text-md rounded-md"
                                                }
                                            >
                                                <p>
                                                    {transaction.category ===
                                                    "Income"
                                                        ? "+"
                                                        : "-"}
                                                </p>
                                                <h1>${transaction.amount}</h1>
                                                {transaction.category ===
                                                "Income" ? (
                                                    <FaArrowTrendUp className="max-sm:hidden" />
                                                ) : (
                                                    <FaArrowTrendDown className="max-sm:hidden" />
                                                )}
                                            </div>
                                            <h1>{transaction.category}</h1>
                                            <h1
                                                onClick={() =>
                                                    handleEdit(transaction)
                                                }
                                                className="transition-colors cursor-pointer hover:text-green-500"
                                            >
                                                <FaEdit />
                                            </h1>
                                            <h1
                                                onClick={() =>
                                                    handleDelete(
                                                        transaction._id
                                                    )
                                                }
                                                className="transition-colors cursor-pointer hover:text-red-500"
                                            >
                                                <MdDeleteForever />
                                            </h1>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )
    );
};

export default Transactions;
