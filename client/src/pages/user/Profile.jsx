import { useState } from "react";
import { useAuth } from "../../store/auth"
import { useEffect } from "react";
import { NavLink } from "react-router";

export function Profile() {
    const { userData, logout } = useAuth();
    const uid = userData._id;
    const {URL, tokenBearer} = useAuth();
    const [data, setData] = useState({
        username: "",
        email: "",
        phone: ""
    })

    const getUser = async () => {
        const response = await fetch(`${URL}/api/user`, {
            method: 'GET',
            headers: {
                Authorization: tokenBearer
            }
        });
        const data = await response.json();
        setData(data);
    }

    useEffect(() => {
        getUser();
    }, []);

    return <section>
        <div className="profile-container">
            <div className="user-img">
                <img src="https://www.pngmart.com/files/23/Profile-PNG-Photo.png" alt="profile image" />
            </div>
            <div className="user-info">
                <p><b>Username: </b>{data.username}</p><br />
                <p><b>Email: </b>{data.email}</p><br />
                <p><b>Phone: </b>{data.phone}</p><br />
                <span><NavLink className="nav-link" to={'/user/order/show'} ><b>View Orders</b></NavLink></span><br />
                <span><NavLink className="nav-link" to={`/user/cart/${uid}`} ><b>View Cart</b></NavLink></span><br />
                <span><NavLink to={'/'} onClick={() => { logout() }} className="logout">Logout <i className="fa-solid fa-right-from-bracket"></i></NavLink></span>
            </div>
        </div>
    </section>
}