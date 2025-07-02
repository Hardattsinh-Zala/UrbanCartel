import { useEffect, useState } from "react"
import { useAuth } from "../../store/auth";

export function Orders() {
    const [orders, setOrders] = useState([]);
    const {URL, tokenBearer} = useAuth();

    const getAllOrders = async () => {
        try {
            const response = await fetch(`${URL}/api/admin/orders`, {
                method: 'GET',
                headers: {
                    Authorization: tokenBearer
                }
            });
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllOrders();
    }, []);

    return <section>
        <div className="users">
            <div className="users-container">
                {
                    orders.length !== 0 ?
                    orders.map((order, index) => {
                        return <div className="user-box" key={index}>
                            <p><b>userId: </b> {order.user} </p>
                            <p><b>items: </b> {order.items.length} </p>
                        </div>
                    })

                    :

                    <p>No orders yet</p>
                }
            </div>
        </div>
    </section>
}