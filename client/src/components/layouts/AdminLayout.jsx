import { useNavigate, Outlet } from "react-router"
import { useAuth } from "../../store/auth"
import { useEffect } from "react";
import { NavLink } from "react-router";

export function AdminLayout() {
    const navigate = useNavigate();
    const { isLoggedIn, isAdmin } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) return navigate('/login');
        if (!isAdmin) return navigate('/');
    }, [isLoggedIn, isAdmin, navigate]);

    return <section>
        <div className="admin">
            <div className="admin-container">
                <div className="admin-bar">
                    <span><NavLink to={'/admin/users'} >Users</NavLink></span>
                    <span><NavLink to={'/admin/orders'} >Orders</NavLink></span>
                    <span><NavLink to={'/admin/contacts'} >Contacts</NavLink></span>
                    <span><NavLink to={'/admin/books'} >Books</NavLink></span>
                </div>
                <Outlet />
            </div>
        </div>
    </section>
}