import { useNavigate, useParams } from "react-router"
import { useAuth } from "../store/auth";
import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import {toast} from "react-toastify"

export function Book() {
    const [book, setBook] = useState({});
    const { id } = useParams();
    const { URL, tokenBearer, isLoggedIn, userData} = useAuth();
    const uid = userData._id;
    const navigate = useNavigate();

    const bottomAnimation = {
        initial: { y: '10%', opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 1, delay: 0.4 },
    }

    const addToCart = async () => {
        if(!isLoggedIn) return navigate('/login');
        const cartData = {bookId: id, quantity: 1}
        
        try {
            const response = await fetch(`${URL}/api/cart/add`, {
                method: 'POST',
                headers: {
                    Authorization: tokenBearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cartData)
            });
            const data = await response.json();
            if(response.ok) {
                toast.success(data.msg);
            }else {
                toast.error(data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getBookdata = async () => {
        const response = await fetch(`${URL}/api/book/${id}`, {
            method: 'GET'
        });
        const data = await response.json();
        setBook(data);
    }

    useEffect(() => {
        getBookdata();
    }, []);

    return <section>
        <div className="book-container">
            <div className="book-img">
                <img src={book.image} alt={book.title} />
            </div>
            <div className="book-info">
                <motion.div {...bottomAnimation}>
                    <h1>{book.title}</h1>
                    <p>by <NavLink>{book.author}</NavLink> (Author)</p>
                    <p>{book.ratings}/5</p>
                    <br />
                    <p>{book.description}</p>
                </motion.div>
                <br /><hr /><br />
                <div className="book-details">
                    <span><p>Genre</p><i className="fa-solid fa-face-smile"></i><p>{book.category}</p></span>
                    <span><p>Pages</p><i className="fa-solid fa-book-open"></i><p>{book.pages}</p></span>
                    <span><p>Published in</p><i className="fa-solid fa-building-columns"></i><p>{book.publishedYear}</p></span>
                    <span><p>Language</p><i className="fa-solid fa-globe"></i><p>{book.language}</p></span>
                </div>
                <br /><br />
                <div><p>Buy At</p><h2><sup>&#8377;</sup>{book.price}</h2></div><br />
                <div className="cart-buy-btn">
                    <button onClick={addToCart} >Add to Cart</button>
                    <button className="buy-btn" onClick={() => navigate(`/user/order/${uid}`, {state: {total: book.price, items: [{book: book._id, quantity: 1}]}})} >Buy now</button>
                </div>
            </div>
        </div>

    </section>
}