import { useNavigate } from "react-router";
import { NavLink } from "react-router";
import "./Footer.css";
import { useAuth } from "../store/auth";

export function Footer() {
    const navigate = useNavigate();
    const {userData} = useAuth();
    const uid = userData._id;

    return (
        <footer className="footer">
            <div className="data">
                <div className="text">
                    <h4>About Us</h4><hr />
                    <p>
                        Your one-stop shop for quality products at unbeatable prices.<br />
                        We deliver a seamless shopping experience with<br />
                        fast delivery, secure payments, and friendly support.
                    </p>
                    <a onClick={() => navigate("/page-not-found")}>Visit 404 Page</a>
                </div>

                <div className="strategy">
                    <h4>Customer Service</h4><hr />
                    <p>Shipping & Delivery</p>
                    <p>Return Policy</p>
                    <p>Order Tracking</p>
                    <p>Help Center</p>
                    <p>FAQs</p>
                </div>

                <div className="support">
                    <h4>Information</h4><hr />
                    <p>Privacy Policy</p>
                    <p>Terms & Conditions</p>
                    <p>Affiliate Program</p>
                    <p>Site Map</p>
                    <p>Blogs & Articles</p>

                </div>

                <div className="category">
                    <h4>Shop Categories</h4><hr />
                    <p>Books</p>
                    <p>Electronics</p>
                    <p>Clothing</p>
                    <p>Beauty</p>
                    <p>Home & Kitchen</p>
                </div>
            </div>

            <div className="footbar">
                <div className="footer-links">
                    <span><NavLink className="foot-link" to="/">Home</NavLink></span>
                    <span><NavLink className="foot-link" to="/shop">Shop</NavLink></span>
                    <span><NavLink className="foot-link" to="/contact">Contact</NavLink></span>
                    <span><NavLink className="foot-link" to={`/user/cart/${uid}`} >Cart</NavLink></span>
                </div>
                <div className="socials">
                    <a className="foot-link" href="https://www.instagram.com/hardattsinhji_adval" target="_blank">Instagram</a>
                    <a className="foot-link" href="https://x.com/hardattsinhji" target="_blank">Twitter</a>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} UrbanCartel. All rights reserved.</p>
            </div>
        </footer>
    );
}
