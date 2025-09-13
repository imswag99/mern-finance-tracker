import { FaRegCreditCard } from "react-icons/fa";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import {
    FaArrowTrendUp,
    FaArrowTrendDown,
    FaArrowRightLong,
} from "react-icons/fa6";
import moment from "moment";
import FinanceOverview from "../../components/FinanceOverview";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Dashboard = () => {
    const navigate = useNavigate();
    const [transactionData, setTransactionData] = useState({});
    const { url, setCurrPage } = useContext(UserContext);
    const [ready, setReady] = useState(false);

    const loadTransactionData = async () => {
        await axios
            .get(`${url}/api/dashboard/getDashboardData`)
            .then((response) => {
                if (response.data.success) {
                    setTransactionData(response.data.dashboardData);
                    setReady(true);
                }
            });
    };

    useEffect(() => {
        loadTransactionData();
    }, []);

    const seeAllHandler = () => {
        setCurrPage("Transactions");
        navigate("/transactions");
    };

    return (
        ready && (
            <div className="w-[100vw] h-[100vh]">
                <Navbar />
                <div className="w-full flex">
                    <Sidebar />
                    <div className="flex-1 flex flex-col gap-10">
                        <div className="flex justify-center items-center gap-5 max-sm:flex-col max-sm:mx-5">
                            <div className="w-[30%] flex bg-second gap-3 items-center pl-10 py-7 rounded-xl shadow-md shadow-shadow max-sm:w-full">
                                <button className="bg-pink-600 text-white text-xl p-3 rounded-full">
                                    <FaRegCreditCard />
                                </button>
                                <div>
                                    <p className="text-gray-400 text-sm">
                                        Total Balance
                                    </p>
                                    <h1 className="text-white text-xl">
                                        ${transactionData.totalBalance}
                                    </h1>
                                </div>
                            </div>
                            <div className="w-[30%] flex bg-second gap-3 items-center pl-10 py-7 rounded-xl shadow-md shadow-shadow max-sm:w-full">
                                <button className="bg-primary text-white text-xl p-3 rounded-full">
                                    <MdOutlineAccountBalanceWallet />
                                </button>
                                <div>
                                    <p className="text-gray-400 text-sm">
                                        Total Income
                                    </p>
                                    <h1 className="text-white text-xl">
                                        ${transactionData.totalIncome}
                                    </h1>
                                </div>
                            </div>
                            <div className="w-[30%] flex bg-second gap-3 items-center pl-10 py-7 rounded-xl shadow-md shadow-shadow max-sm:w-full">
                                <button className="bg-orange-400 text-white text-xl p-3 rounded-full">
                                    <GiPayMoney />
                                </button>
                                <div>
                                    <p className="text-gray-400 text-sm">
                                        Total Expense
                                    </p>
                                    <h1 className="text-white text-xl">
                                        ${transactionData.totalExpense}
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="w-[90%] shadow-md shadow-shadow p-7 pt-5 rounded-xl self-center">
                            <div className="flex justify-between">
                                <h1 className="text-white text-xl max-sm:text-md">
                                    Recent Transactions
                                </h1>
                                <button
                                    onClick={seeAllHandler}
                                    className="flex justify-center items-center gap-1 text-primary cursor-pointer"
                                >
                                    See All <FaArrowRightLong />
                                </button>
                            </div>
                            {transactionData.recentTransactions.map((item) => {
                                return (
                                    <div
                                        className="flex justify-between text-white pt-5"
                                        key={item._id}
                                    >
                                        <div>
                                            <h1 className="text-lg max-sm:text-sm">
                                                {item.title}
                                            </h1>
                                            <p className="text-gray-400 max-sm:text-sm">
                                                {moment(item.date).format(
                                                    "YYYY-MM-DD"
                                                )}
                                            </p>
                                        </div>
                                        <div
                                            className={
                                                item.category === "Income"
                                                    ? "h-[2.5rem] flex items-center justify-center gap-2 bg-green-100 text-green-700 text-md px-5 rounded-md"
                                                    : "h-[2.5rem] flex items-center justify-center gap-2 bg-red-100 text-red-700 text-md px-5 rounded-md"
                                            }
                                        >
                                            <p>
                                                {item.category === "Income"
                                                    ? "+"
                                                    : "-"}
                                            </p>
                                            <h1>${item.amount}</h1>
                                            {item.category === "Income" ? (
                                                <FaArrowTrendUp />
                                            ) : (
                                                <FaArrowTrendDown />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="w-[90%] shadow-md shadow-shadow p-7 mb-5 rounded-xl text-white self-center">
                            <FinanceOverview
                                totalBalance={transactionData.totalBalance}
                                totalIncome={transactionData.totalIncome}
                                totalExpense={transactionData.totalExpense}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default Dashboard;
