import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { useEffect } from "react";

export function DeleteBook() {
    const location = useLocation();
    const {URL, tokenBearer} = useAuth();
    const {id} = location.state;
    const navigate = useNavigate();

    const deleteFunction = async () => {
        const response = await fetch(`${URL}/api/admin/deleteBook/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: tokenBearer
            },
        });
        const data = await response.json();
        if(response.ok) {
            toast.success(data.msg);
        }else {
            toast.error(data.msg);
        }
        navigate('/admin/books');
    }

    useEffect(() => {
        deleteFunction();
    }, []);

    return null;
}