import { useState } from "react";
import { useAuth } from "../store/auth";
import { useLocation } from "react-router";
import { toast } from "react-toastify"
import { useNavigate } from "react-router"
import OtpInput from "react-otp-input"

export function OtpVerify() {
    const [otp, setOtp] = useState("");
    const { URL, setUserToken } = useAuth();
    const location = useLocation();
    const user = location.state;
    const navigate = useNavigate();

    const handleChange = (value) => {
        setOtp(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const preVerified = await fetch(`${URL}/api/otp/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: user.email, otp: Number(otp) })
            })
            const verified = await preVerified.json();
            if (preVerified.ok) {
                const response = await fetch(`${URL}/api/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user)
                });
                const data = await response.json();
                if (response.ok) {
                    setUserToken(data.token);
                    navigate("/");
                    toast.success(data.msg);
                } else {
                    toast.error(data.msg);
                }
            }else {
                toast.error(verified.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return <section className="register">
        <form className="register-container" onSubmit={handleSubmit}>
            <h2>Verify OTP</h2>
            <OtpInput
                value={otp}
                onChange={handleChange}
                numInputs={6}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                    width: "3rem",
                    height: "3rem",
                    fontSize: "1.5rem",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    textAlign: "center",
                    margin: "0 4px",
                }}
            />
            <p>Enter the OTP sent to your email</p>
            <button>Submit</button>
        </form>
    </section>
}