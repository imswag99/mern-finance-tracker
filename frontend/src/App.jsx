import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Transactions from "./pages/Dashboard/Transactions";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard/Dashboard";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

const App = () => {
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
            </Routes>
        </>
    );
};

export default App;
