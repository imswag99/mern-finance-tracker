import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const url = "https://mern-finance-tracker-6tgz.onrender.com";
    const [token, setToken] = useState("");
    const [userData, setUserData] = useState("");
    const [currPage, setCurrPage] = useState("");

    useEffect(() => {
        async function loadData() {
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        axios
            .get(`${url}/api/user/getUser`, {
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                setUserData(response.data.user.username);
            });
    }, [token]);

    return (
        <UserContext.Provider
            value={{
                url,
                token,
                setToken,
                userData,
                setUserData,
                currPage,
                setCurrPage,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
