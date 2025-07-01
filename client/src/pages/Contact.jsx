import { useState } from "react"
import { useAuth } from "../store/auth"
import { toast } from "react-toastify"

export function Contact() {
    const {URL} = useAuth();
    const [data, setData] = useState({
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData({
            ...data,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${URL}/api/contact/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const res = await response.json();
            if(response.ok) {
                setData({email: "", message: ""});
                toast.success(res.msg);
            }else {
                toast.error(res.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return <section className="contact">
        <div className="contact-container">
            <h1>Contact Us</h1><br /><br />
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={data.email} onChange={handleChange} autoComplete="off"/>
                <label htmlFor="message">Message</label>
                <textarea rows={10} name="message" id="message" value={data.message} onChange={handleChange} autoComplete="off"/>
                <button>Submit</button>
            </form>
        </div>
    </section>
}