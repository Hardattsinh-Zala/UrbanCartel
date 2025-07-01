import { useState } from "react";
import { useAuth } from "../../store/auth"
import { useEffect } from "react";
import { NavLink } from "react-router";

export function Profile() {
    const { userData, logout } = useAuth();
    const uid = userData._id;
    const [data, setData] = useState({
        username: "",
        email: "",
        phone: ""
    })

    useEffect(() => {
        if (userData) {
            setData({
                username: userData.username,
                email: userData.email,
                phone: userData.phone
            });
        }
    }, [userData]);

    return <section>
        <div className="profile-container">
            <div className="user-img">
                <img src="https://www.pngmart.com/files/23/Profile-PNG-Photo.png" alt="profile image" />
            </div>
            <div className="user-info">
                {/* <form >
                    <label htmlFor="username">Name</label>
                    <input type="text" name="username" id="username" value={data.username} />
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={data.email} />
                    <label htmlFor="phone">phone</label>
                    <input type="phone" name="phone" id="phone" value={data.phone}/>
                    <button>Edit profile</button>
                </form> */}
                <p><b>Username: </b>{data.username}</p><br />
                <p><b>Email: </b>{data.email}</p><br />
                <p><b>Phone: </b>{data.phone}</p><br />
                <span><NavLink className="nav-link" to={'/user/order/show'} ><b>View Orders</b></NavLink></span><br />
                <span><NavLink className="nav-link" to={`/user/cart/${uid}`} ><b>View Cart</b></NavLink></span><br />
                {/* <button>Edit</button><br /> */}
                <span><NavLink to={'/'} onClick={() => { logout(); handleShow() }} className="logout">Logout <i className="fa-solid fa-right-from-bracket"></i></NavLink></span>
            </div>
        </div>
    </section>
}