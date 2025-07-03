import { useContext, createContext } from "react"
import {useState, useEffect} from "react"

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userData, setUserData] = useState({});
    const tokenBearer = "Bearer "+token;
    const URL = "https://urbancartel.onrender.com";
    // const URL = "http://localhost:3000";

    const isLoggedIn = !!token;

    const userAuthenticate = async () => {
        const response = await fetch(`${URL}/api/user`, {
            method: 'GET',
            headers: {
                Authorization: tokenBearer
            }
        });
        const data = await response.json();
        if(response.ok) {
            setUserData(data);
            setIsAdmin(data.isAdmin);
            localStorage.setItem("isAdmin", data.isAdmin);
        }
    }

    useEffect(() => {
        userAuthenticate();
    }, []);

    const setUserToken = (token) => {
        setToken(token);
        return localStorage.setItem("token", token);
    }

    const logout = () => {
        setUserData({});
        setToken("");
        setIsAdmin(false);
        localStorage.removeItem("isAdmin");
        return localStorage.removeItem("token");
    }

    return <AuthContext.Provider value={{logout, setUserToken, userData, tokenBearer, isAdmin, isLoggedIn, URL}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
}
