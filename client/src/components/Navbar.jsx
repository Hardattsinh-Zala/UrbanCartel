import { NavLink } from "react-router"
import { useAuth } from "../store/auth"
import { useState } from "react"
import "./Navbar.css"

export function Navbar() {
    const [show, setShow] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const { isLoggedIn, logout, userData } = useAuth();
    const uid = userData._id;

    const handleShow = (e) => {
        if (!hasInteracted)
            setHasInteracted(true);
        setShow(!show);
    }

    return <section>
        <div className="nav-container">
            <span className="logo"><NavLink className="nav-link" to={'/'}>UrbanCartel</NavLink></span>
            <div className="links">
                <span><NavLink className="nav-link" to={'/'}>Home</NavLink></span>
                <span><NavLink className="nav-link" to={'/shop'}>Shop</NavLink></span>
                <span><NavLink className="nav-link" to={'/contact'}>Contact</NavLink></span>
                {
                    !isLoggedIn &&
                    <>
                        <span><NavLink className="nav-link" to={'/login'}>Login</NavLink></span>
                        <span><NavLink className="nav-link" to={'/register'}>Register</NavLink></span>
                    </>
                }
                {
                    isLoggedIn
                    &&
                    <>
                        <span><NavLink to={'/user/profile'} className="nav-link"><i className="fa-regular fa-user"></i>  Profile</NavLink></span>
                        <span><NavLink to={`/user/cart/${uid}`} className="nav-link"><i className="fa-solid fa-cart-shopping"></i>  Cart</NavLink></span>
                        <span><NavLink to={`/user/order/show`} className="nav-link"><i className="fa-solid fa-truck-fast"></i>  Orders</NavLink></span>
                    </>
                }
            </div>

            <div className="sidebar-links">
                <span className="account" onClick={handleShow}><i className="fa-solid fa-bars"></i></span>
                <div className={`sidebar ${hasInteracted ? (show ? "sidebarup" : "sidebardown") : ""}`}>
                    {
                        isLoggedIn
                        &&
                        <div>
                            <span onClick={handleShow} style={{ textAlign: "right", display: "block" }}><i className="fa-solid fa-xmark"></i></span>
                            <span><NavLink to={'/user/profile'} onClick={handleShow} className="nav-link"><i className="fa-regular fa-user"></i>  Profile</NavLink></span><br /><br />
                            <span><NavLink to={`/user/cart/${uid}`} className="nav-link" onClick={handleShow}><i className="fa-solid fa-cart-shopping"></i>  Cart</NavLink></span><br /><br />
                            <span><NavLink to={`/user/order/show`} className="nav-link" onClick={handleShow}><i className="fa-solid fa-truck-fast"></i>  Orders</NavLink></span>
                        </div>
                    }
                    <div className="sidebar-max">
                        <hr />
                        <span><NavLink onClick={handleShow} className="nav-link" to={'/'}>Home</NavLink></span>
                        <span><NavLink onClick={handleShow} className="nav-link" to={'/shop'}>Shop</NavLink></span>
                        <span><NavLink onClick={handleShow} className="nav-link" to={'/contact'}>Contact</NavLink></span>
                        {
                            !isLoggedIn &&
                            <>
                                <span><NavLink onClick={handleShow} className="nav-link" to={'/login'}>Login</NavLink></span>
                                <span><NavLink onClick={handleShow} className="nav-link" to={'/register'}>Register</NavLink></span>
                            </>
                        }
                    </div>
                    {isLoggedIn && <span><NavLink to={'/'} onClick={() => { logout(); handleShow() }} className="logout">Logout <i className="fa-solid fa-right-from-bracket"></i></NavLink></span>}
                </div>
            </div>

            <span className="menu">Menu</span>
        </div>
    </section>
}