import { useContext, useState } from "react";
import img from "/img4.png";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const { url, setToken } = useContext(UserContext);
    const [currState, setCurrState] = useState("login");
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleCurrState = (e) => {
        e.preventDefault();
        if (currState === "login") {
            setCurrState("signup");
        } else {
            setCurrState("login");
        }
    };

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newUrl = url;
        if (currState === "login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            if (currState === "login") {
                navigate("/dashboard");
            } else {
                setCurrState("login");
                setData({
                    username: "",
                    email: "",
                    password: "",
                });
            }
        } else {
            alert(response.data.message);
        }
    };

    return (
        <div className="w-[100vw] h-[100vh] flex flex-col gap-10 justify-center items-center">
            <h1 className="uppercase self-start ml-20 text-white text-2xl max-sm:ml-10 max-sm:text-xl max-sm:mb-10">
                Finance Tracker
            </h1>
            <div className="w-[80%] h-[80%] flex justify-center items-center max-sm:flex-col-reverse">
                <div className="w-[45%] max-sm:w-full">
                    <form
                        onSubmit={handleSubmit}
                        className="w-[80%] flex flex-col gap-5 max-sm:w-full"
                    >
                        <h1 className="text-primary text-3xl mb-5 underline underline-offset-4">
                            {currState === "login" ? "Login" : "Sign Up"}
                        </h1>
                        {currState === "login" ? (
                            <></>
                        ) : (
                            <div className="flex flex-col gap-1">
                                <h1 className="text-primary text-xl">Name</h1>
                                <input
                                    className="bg-transparent outline-0 border-2 border-primary rounded-2xl py-2 px-3 text-white placeholder-gray-300"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    onChange={onChangeHandler}
                                    name="username"
                                    value={data.username}
                                />
                            </div>
                        )}
                        <div className="flex flex-col gap-1">
                            <h1 className="text-primary text-xl">Email</h1>
                            <input
                                className="bg-transparent outline-0 border-2 border-primary rounded-2xl py-2 px-3 text-white placeholder-gray-300"
                                type="email"
                                placeholder="example@gmail.com"
                                required
                                onChange={onChangeHandler}
                                name="email"
                                value={data.email}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-primary text-xl">Password</h1>
                            <input
                                className="bg-transparent outline-0 border-2 border-primary rounded-2xl py-2 px-3 text-white placeholder-gray-300"
                                type="password"
                                placeholder="password"
                                required
                                onChange={onChangeHandler}
                                name="password"
                                value={data.password}
                            />
                        </div>
                        <button
                            className="w-[30%] bg-primary text-white rounded-2xl py-2 px-1 cursor-pointer"
                            type="submit"
                        >
                            {currState === "login" ? "Login" : "Sign Up"}
                        </button>
                        <h3 className="text-white">
                            {currState === "login"
                                ? "Don't have an account yet?"
                                : "Already have an account?"}
                            <button
                                type="button"
                                className="text-primary font-bold cursor-pointer pl-2"
                                onClick={handleCurrState}
                            >
                                {currState === "login" ? "signup" : "login"}
                            </button>
                        </h3>
                    </form>
                </div>
                <div className="w-[45%] flex max-sm:w-full">
                    <img
                        className="w-[100%] h-[100%] rounded-2xl"
                        src={img}
                        alt="img"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
