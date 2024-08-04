import { createContext, useCallback, useEffect, useState } from "react";
import { baseurl, postRequest } from "../utils/services";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    let navigate = useNavigate();
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterinfo] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("User");
        setUser(JSON.parse(user));
    }, []);

    const registerUser = useCallback(async (e, info) => {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);

        try {
            const response = await postRequest(`${baseurl}/users/register`, info);
            console.log('response', response);

            setIsRegisterLoading(false);

            if (response.error) {
                return setRegisterError(response);
            }
            localStorage.setItem("User", JSON.stringify(response));
            setUser(response.user);
        } catch (error) {
            setIsRegisterLoading(false);
            setRegisterError({ error: true, message: error.message });
        }
    }, []);

    const logoutUser = () => {
        localStorage.removeItem('User');
        setUser(null);
        navigate('/login');
    }

    const loginUserFunction = async (e, info) => {
        e.preventDefault();
        setIsLoginLoading(true);
        setLoginError(null);

        const response = await postRequest(`${baseurl}/users/login`, info);

        setIsLoginLoading(false);
        if (response.error) {
            return setLoginError(response);
        }
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
        navigate('/');
    }

    return (
        <AuthContext.Provider value={{
            user,
            registerInfo,
            setRegisterinfo,
            registerUser,
            registerError,
            isRegisterLoading,
            logoutUser,
            loginUserFunction,
            loginError,
            isLoginLoading,
            setLoginInfo,
            loginInfo
        }}>
            {children}
        </AuthContext.Provider>
    );
};
