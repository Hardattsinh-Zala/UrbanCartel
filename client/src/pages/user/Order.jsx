import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";

export function Order() {
    const { tokenBearer, URL, userData } = useAuth();

    const location = useLocation();
    const { total, items } = location.state;

    const [isValid, setIsValid] = useState(false);
    const [address, setAddress] = useState({
        fullName: "",
        street: "",
        postalCode: "",
        city: "",
        state: "",
        country: ""
    });

    useEffect(() => {
        const filled = Object.values(address).every(value => value.trim() !== "");
        setIsValid(filled);
    }, [address]);

    const navigate = useNavigate();

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    }

    const verifyPay = async (response) => {
        try {
            const rawData = await fetch(`${URL}/api/payment/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id, 
                    razorpay_payment_id: response.razorpay_payment_id, 
                    razorpay_signature: response.razorpay_signature, 
                })
            });
            const data = await rawData.json();
            if(data.success) {
                toast.success("Payment successful.");
                handleOrder();
            }else {
                toast.error("Payment failed.");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const displayRazorpay = async () => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            toast.error("Razorpay SDK failed to load.");
            return;
        }

        const response = await fetch(`${URL}/api/payment/create-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: total })
        });

        const data = await response.json();

        const options = {
            key: import.meta.env.VITE_RAZOR_KEY_ID ,
            amount: data.amount,
            currency: "INR",
            name: "Urban Cartel",
            description: "Thank you for your purchase",
            image: "https://i.etsystatic.com/isla/47b058/16540610/isla_280x280.16540610_nqpfe7im.jpg?version=0",
            order_id: data.id,
            prefill: {
                name: address.fullName,
                email: userData.email,
                contact: userData.phone
            },
            handler: function (response) {
                verifyPay(response);
            },
            notes: {
                address: `${address.street}/${address.city}/${address.state}/${address.country}`
            },
            theme: {
                color: "#3399cc"
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

    }

    const handleOrder = async () => {
        try {
            const response = await fetch(`${URL}/api/order/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: tokenBearer,
                },
                body: JSON.stringify({ items: items.flat(), total, address, status: "paid" }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(data.msg);
                navigate('/user/order/show');
            } else {
                toast.error(data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        try {
            const value = e.target.value;
            const name = e.target.name;

            setAddress({
                ...address,
                [name]: value
            });
        } catch (error) {
            console.log(error);
        }
    }

    return <section>
        <div className="order">
            <div className="order-container">
                <div className="details">
                    <h3>Billing details</h3><br />
                    <form >
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" name="fullName" id="fullName" placeholder="Enter full name" onChange={handleChange} autoComplete="off" />
                        <label htmlFor="street">Street</label>
                        <input type="text" name="street" id="street" placeholder="Enter street" onChange={handleChange} autoComplete="off" />
                        <label htmlFor="postalCode">Postal code</label>
                        <input type="number" name="postalCode" id="postalCode" placeholder="Enter postal code" onChange={handleChange} autoComplete="off" />
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" id="city" placeholder="Enter city" onChange={handleChange} autoComplete="off" />
                        <label htmlFor="phone">State</label>
                        <input type="text" name="state" id="state" placeholder="Enter state" onChange={handleChange} autoComplete="off" />
                        <label htmlFor="country">Country</label>
                        <input type="text" name="country" id="country" placeholder="Enter country" onChange={handleChange} autoComplete="off" />
                    </form>
                </div>
                <div className="payment">
                    <div>
                        <p>items: {items.flat().length} </p>
                        <p>Delivery:   Cash on delivery</p>
                        <p><b>Total:  &#8377;{total} </b></p>
                    </div>
                    <button disabled={!isValid} className="buy-btn" onClick={handleOrder}>Place Order</button><br />
                    <div><hr /></div>
                    <button disabled={!isValid} onClick={displayRazorpay} >Razorpay</button>
                </div>
            </div>
        </div>
    </section>
}