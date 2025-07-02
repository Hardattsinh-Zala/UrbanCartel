import { useNavigate, Outlet } from "react-router"
import { useAuth } from "../../store/auth"
import { useEffect } from "react";
import { NavLink } from "react-router";

export function AdminLayout() {
    const navigate = useNavigate();
    const { isLoggedIn, userData } = useAuth();

    useEffect(() => {
        async () => {
            const isAdmin = await userData.isAdmin;
            if (!isLoggedIn) return navigate('/login');
            console.log(isAdmin);
            if (!isAdmin) return navigate('/');
        }
    }, []);

    return <section>
        <div className="admin">
            <div className="admin-container">
                <div className="admin-bar">
                    <span><NavLink to={'/admin/users'} >Users</NavLink></span>
                    <span><NavLink to={'/admin/orders'} >Orders</NavLink></span>
                    <span><NavLink to={'/admin/contacts'} >Contacts</NavLink></span>
                    <span>Products</span>
                </div>
                <Outlet />
            </div>
        </div>
    </section>
}