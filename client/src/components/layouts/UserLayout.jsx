import { useNavigate, Outlet } from "react-router"
import { useAuth } from "../../store/auth"
import { useEffect } from "react";

export function UserLayout() {
    const navigate = useNavigate();
    const {isLoggedIn} = useAuth();

    useEffect(() => {
        if(!isLoggedIn) return navigate('/login');
    }, []);

    return <section>
        <Outlet />
    </section>
}