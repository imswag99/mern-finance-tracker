import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import user from "/user.png";
import { UserContext } from "../context/UserContext";
import { LuLayoutList } from "react-icons/lu";
import { FaRegCreditCard } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";

const Sidebar = () => {
    const { userData, setUserData } = useContext(UserContext);
    const { url, setToken, currPage, setCurrPage } = useContext(UserContext);
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    const handleLogout = async () => {
        const { data } = await axios.post(`${url}/api/user/logout`);
        if (data.success) {
            setToken("");
            setToken(localStorage.removeItem("token"));
            setUserData("");
            setCurrPage("Dashboard");
            navigate("/");
        }
    };

    const changePageToDashboard = () => {
        setCurrPage("Dashboard");
        navigate("/dashboard");
    };

    const changePageToTransactions = () => {
        setCurrPage("Transactions");
        navigate("/transactions");
    };

    return (
        <>
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-white text-2xl pl-5 absolute top-5.5 sm:hidden"
            >
                <IoMenu />
            </button>
            {showMenu && (
                <div className="w-[100vw] h-[100vh] z-10 fixed bg-second">
                    <div className="flex flex-col justify-center items-center gap-2 py-7">
                        <img className="w-16" src={user} alt="profile image" />
                        <h1 className="text-white text-l">{userData}</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-5">
                        <button
                            onClick={changePageToDashboard}
                            className={
                                currPage === "Dashboard"
                                    ? "rounded-xl bg-primary text-white w-[80%] py-2 pl-5 flex items-center gap-1 shadow-sm shadow-shadow"
                                    : "rounded-xl text-white w-[80%] py-2 pl-5 flex items-center gap-1 cursor-pointer"
                            }
                        >
                            <LuLayoutList />
                            Dashboard
                        </button>
                        <button
                            onClick={changePageToTransactions}
                            className={
                                currPage === "Transactions"
                                    ? "rounded-xl bg-primary text-white w-[80%] py-2 pl-5 flex items-center gap-1 shadow-sm shadow-shadow"
                                    : "rounded-xl text-white w-[80%] py-2 pl-5 flex items-center gap-1 cursor-pointer"
                            }
                        >
                            <FaRegCreditCard />
                            Transactions
                        </button>
                        <button
                            className="rounded-xl text-white w-[80%] py-2 pl-5 flex items-center gap-1 cursor-pointer"
                            onClick={handleLogout}
                        >
                            <IoMdExit />
                            Logout
                        </button>
                    </div>
                </div>
            )}
            {!showMenu && (
                <div className="w-[20%] max-sm:hidden">
                    <div className="flex flex-col justify-center items-center gap-2 py-7">
                        <img className="w-16" src={user} alt="profile image" />
                        <h1 className="text-white text-l">{userData}</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-5">
                        <button
                            onClick={changePageToDashboard}
                            className={
                                currPage === "Dashboard"
                                    ? "rounded-xl bg-primary text-white w-[80%] py-2 pl-5 flex items-center gap-1 shadow-sm shadow-shadow"
                                    : "rounded-xl text-white w-[80%] py-2 pl-5 flex items-center gap-1 cursor-pointer"
                            }
                        >
                            <LuLayoutList />
                            Dashboard
                        </button>
                        <button
                            onClick={changePageToTransactions}
                            className={
                                currPage === "Transactions"
                                    ? "rounded-xl bg-primary text-white w-[80%] py-2 pl-5 flex items-center gap-1 shadow-sm shadow-shadow"
                                    : "rounded-xl text-white w-[80%] py-2 pl-5 flex items-center gap-1 cursor-pointer"
                            }
                        >
                            <FaRegCreditCard />
                            Transactions
                        </button>
                        <button
                            className="rounded-xl text-white w-[80%] py-2 pl-5 flex items-center gap-1 cursor-pointer"
                            onClick={handleLogout}
                        >
                            <IoMdExit />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
