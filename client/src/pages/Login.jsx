import { useState } from "react"
import { NavLink } from "react-router"
import {toast} from "react-toastify"
import { useNavigate } from "react-router"
import { useAuth } from "../store/auth"

export function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const {setUserToken, URL, isAdmin} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        try {
            const value = e.target.value;
            const name = e.target.name;

            setUser({
                ...user,
                [name]: value
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            if(response.ok) {
                setUserToken(data.token);
                navigate("/");
                toast.success(data.msg);
            }else {
                toast.error(data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return <section className="login">
        <form className="login-container" onSubmit={handleSubmit}>
            <h2>Sign in</h2>
            <input type="email" name="email" id="email" placeholder="Enter email" onChange={handleChange} autoComplete="off"/>
            <input type="password" name="password" id="password" placeholder="Enter password" onChange={handleChange} autoComplete="off"/>
            <p>New here? Let's make it official <NavLink to={'/register'}>Sign Up</NavLink></p>
            <button>Sign In</button>
        </form>
    </section>
}