import { useState } from "react";
import { useAuth } from "../../store/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function ShowOrders() {
    const [orders, setOrders] = useState([]);
    const [books, setBooks] = useState([]);
    const { URL, tokenBearer } = useAuth();
    const navigate = useNavigate();

    const getOrders = async () => {
        try {
            const response = await fetch(`${URL}/api/order/show`, {
                method: 'GET',
                headers: {
                    Authorization: tokenBearer,
                },
            });
            const data = await response.json();

            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getBooks = async () => {
        try {
            const items = orders.map(order => order.items);

            const responses = await Promise.all(
                items.map(async (item) => {
                    const bookIds = item.map(value => value.book);

                    const res = await fetch(`${URL}/api/book/cart`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ ids: bookIds })
                    });
                    return res.json();
                })
            )
            setBooks(responses);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOrders();
    }, []);

    useEffect(() => {
        getBooks();
    }, [orders]);

    return <section>
        <div className="showOrder">
            <div className="showOrder-container">
                <h1>Orders</h1>
                {
                    orders.length !== 0 ?
                    orders.map((order, index) => {
                        return <div className="order-box" key={index}>
                            <div className="order-details">
                                <p><b>Order ID: </b> {order._id} </p>
                                <p><b>Placed On: </b> {new Date(order.createdAt).toISOString().split('T')[0]} </p>
                                <p><b>Total amount paid: </b> &#8377;{order.total} </p>
                                <p style={{color: "green"}} ><b>Status:</b> {order.status} </p><br />

                                <h3>Delivery address</h3>
                                <p> {order.address.fullName} <br /> {order.address.street} <br /> {order.address.city}, {order.address.state} </p><br />

                                <h3>Ordered Items</h3>
                                <p>Items: {order.items.length} </p>
                            </div>
                            {
                                books[index]?.map((book, idx) => {
                                    return <div className="book-details" key={idx}>
                                        <img src={book.image} alt={book.title} />
                                        <div>
                                            <p><b>Title: </b> {book.title} </p>
                                            <p><b>Price: </b> &#8377;{book.price} </p>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    })
                    :
                    <div className="emptyBoxImage-container">
                        <img src="/EmptyBox.png" alt="Empty box image" ></img>
                        <h2>No orders yet</h2>
                    </div>
                }
                {orders.length !== 0 ? <button onClick={() => navigate('/shop')} >Continue Shopping</button> : null}
            </div>
        </div>
    </section>
}