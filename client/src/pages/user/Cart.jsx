import { useParams, useNavigate } from "react-router"
import { useAuth } from "../../store/auth";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function Cart() {
    const [orderItems, setOrderItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState([]);
    const { uid } = useParams();
    const { URL, tokenBearer } = useAuth();
    const navigate = useNavigate();

    const getCart = async () => {
        try {
            const response = await fetch(`${URL}/api/cart/${uid}`, {
                method: 'GET',
                headers: {
                    Authorization: tokenBearer,
                }
            });
            const data = await response.json();
            setOrderItems([data.items]);

            const bookIds = data.items.map((id) => {
                return id.book;
            })


            const responseBooks = await fetch(`${URL}/api/book/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ids: bookIds })
            });
            const books = await responseBooks.json();


            const merge = books.map(book => {
                const mergeItem = data.items.find(item => item.book.toString() === book._id);
                return {
                    ...book,
                    quantity: mergeItem.quantity
                }
            })
            const totalPrice = merge.reduce((prev, book) => prev + (parseInt(book.price) * parseInt(book.quantity)), 0);
            setTotal(totalPrice);
            setItems(merge);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteItem = async (id) => {
        try {
            const response = await fetch(`${URL}/api/cart/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: tokenBearer
                }
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(data.msg);
                getCart();
            }
            else {
                toast.error(data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editQuantity = async (id, op) => {
        try {
            const response = await fetch(`${URL}/api/cart/quantity/${id}?op=${op}`, {
                method: 'PATCH',
                headers: {
                    Authorization: tokenBearer
                }
            });
            const data = await response.json();
            if (response.ok) {
                const newItems = items.map(item => {
                    if (item._id === id) {
                        return { ...item, quantity: data };
                    }
                    return item;
                });
                setItems(newItems);
            }
            else
                console.log(data.msg);
            navigate(0);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCart();
    }, []);

    return <section>
        <div className="cart">
            <div className="cart-container">
                <h1>Your Cart</h1>
                {
                    items.length !== 0 ?
                        items.map((item, index) => {
                            return <div className="cart-box" key={index}>
                                <img onClick={() => navigate(`/book/${item._id}`)} src={item.image} alt={item.title} />
                                <div className="cart-book-info">
                                    <h2 className="cart-info-head">{item.title}</h2>
                                    <p>by {item.author} </p><br />
                                    <p><b>Mass Market {item.format} </b></p>
                                    <p style={{ color: "green" }}> {item.stock > 0 ? "In stock" : "Out of stock"} </p><br /><br />
                                    <span><button onClick={() => editQuantity(item._id, "dec")} className="quantity">-</button> {item.quantity} <button onClick={() => editQuantity(item._id, "inr")} className="quantity">+</button></span><br /><br />
                                    <button onClick={() => deleteItem(item._id)} className="delete-btn" ><i className="fa-solid fa-trash-can"></i> Delete</button>
                                </div>
                                <div className="price">
                                    <h2><sup>&#8377;</sup>{item.price}</h2>
                                </div>
                            </div>
                        })

                        :

                        <p> is Empty</p>
                }
                {
                    items.length !== 0 ?
                        <div className="total">
                            <button onClick={() => navigate(`/user/order/${uid}`, {state : {total: total, items: orderItems}})} className="buy-btn">Proceed to checkout</button>
                            <div>
                                <p>Subtotal</p>
                                <h2><sup>&#8377;</sup>{total}</h2>
                            </div>
                        </div>
                        :
                        <p></p>
                }
            </div>
        </div>
    </section>
}