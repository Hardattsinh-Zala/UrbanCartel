import { useEffect } from "react";
import { useLocation } from "react-router";

export function ScrollToTop() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'instant'});
    }, [location]);

    return null;
}