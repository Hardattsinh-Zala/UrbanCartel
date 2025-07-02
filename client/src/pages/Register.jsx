import { NavLink } from "react-router"
import {toast} from "react-toastify"
import { useNavigate } from "react-router"
import { useAuth } from "../store/auth"
import { useState } from "react"

export function Register() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });

    const { URL } = useAuth();
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

    const generateOtp = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${URL}/api/otp/generate`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const response = await res.json();
            if(res.ok) {
                toast.success(response.msg);
                navigate('/verify', {state: user});
            }else {
                toast.error(response.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return <section className="register">
        <form className="register-container" onSubmit={generateOtp}>
            <h2>Create account</h2>
            <input type="username" name="username" id="username" placeholder="Enter username" onChange={handleChange} autoComplete="off" />
            <input type="email" name="email" id="email" placeholder="Enter email" onChange={handleChange} autoComplete="off" />
            <input type="phone" name="phone" id="phone" placeholder="Enter phone" onChange={handleChange} autoComplete="off" />
            <input type="password" name="password" id="password" placeholder="Set password" onChange={handleChange} autoComplete="off" />
            <p>Already part of the gang? <NavLink to={'/login'}>Log In</NavLink> here</p>
            <button>Sign In</button>
        </form>
    </section>
}