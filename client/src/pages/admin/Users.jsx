import { useEffect, useState } from "react"
import { useAuth } from "../../store/auth";

export function Users() {
    const [users, setUsers] = useState([]);
    const {URL, tokenBearer} = useAuth();

    const getAllUsers = async () => {
        try {
            const response = await fetch(`${URL}/api/admin/users`, {
                method: 'GET',
                headers: {
                    Authorization: tokenBearer
                }
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllUsers();
    }, []);

    return <section>
        <div className="users">
            <div className="users-container">
                {
                    users.length !== 0 ?
                    users.map((user, index) => {
                        return <div className="user-box" key={index}>
                            <p><b>userId: </b> {user._id} </p>
                            <p><b>username: </b> {user.username} </p>
                            <p><b>email: </b> {user.email} </p>
                            <p><b>phone: </b> {user.phone} </p>
                        </div>
                    })

                    :

                    <p>No users yet</p>
                }
            </div>
        </div>
    </section>
}