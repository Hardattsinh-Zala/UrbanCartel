import { motion } from "framer-motion"
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router";
import { useAuth } from "../store/auth"

export function Home() {
    const [fiction, setFiction] = useState([]);
    const [fantasy, setFantasy] = useState([]);
    const [adventure, setAdventure] = useState([]);
    const [rating, setRating] = useState([]);

    const navigate = useNavigate();
    const {URL} = useAuth();

    const bottomAnimation = {
        initial: { y: '30%', opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 1, delay: 0.8 },
    }

    const getByFiction = async () => {
        const response = await fetch(`${URL}/api/book?category=fiction`, {
            method: 'GET'
        });
        const data = await response.json();
        setFiction(data);
    }
    const getByFantasy = async () => {
        const response = await fetch(`${URL}/api/book?category=fantasy`, {
            method: 'GET'
        });
        const data = await response.json();
        setFantasy(data);
    }
    const getByAdventure = async () => {
        const response = await fetch(`${URL}/api/book?category=adventure`, {
            method: 'GET'
        });
        const data = await response.json();
        setAdventure(data);
    }
    const getByRatings = async () => {
        const response = await fetch(`${URL}/api/book?rating=5`, {
            method: 'GET'
        });
        const data = await response.json();
        setRating(data);
    }

    useEffect(() => {
        getByFiction();
        getByFantasy();
        getByAdventure();
        getByRatings();
    }, []);

    return <section className="home">
        <div className="home-hero">
            <motion.div className="home-hero-text" {...bottomAnimation}>
                <h1>Discover Your Next Favourite</h1>
                <p>Explore bestsellers, new arrivals and exclusive deals.</p>
            </motion.div>
        </div>
        <div className="count">
            <h1>Explore</h1><br />
            <h1 className="count-num">6000+</h1>
            <h1>categories of books</h1>
        </div>
        <div className="home-body">
            <div className="fiction-container">
                <h1>Top Fiction</h1>
                <div className="fiction">
                    {
                        fiction.map((item, index) => {
                            return <div onClick={() => navigate(`/book/${item._id}`)} className="box" key={index}>
                                <img src={item.image || "https://tse3.mm.bing.net/th/id/OIP.XTRtJ8QLrtuV5EQrqSo5hAAAAA?pid=Api&P=0&h=180"} alt={item.title} />
                                <h3>{item.title}</h3>
                                <p>{item.ratings}/5</p>
                                <p><b>&#8377;{item.price}</b></p>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="fiction-container">
                <h1>Fantasy</h1>
                <div className="fiction">
                    {
                        fantasy.map((item, index) => {
                            return <div onClick={() => navigate(`/book/${item._id}`)} className="box" key={index}>
                                <img src={item.image || "https://tse3.mm.bing.net/th/id/OIP.XTRtJ8QLrtuV5EQrqSo5hAAAAA?pid=Api&P=0&h=180"} alt={item.title} />
                                <h3>{item.title}</h3>
                                <p>{item.ratings}/5</p>
                                <p><b>&#8377;{item.price}</b></p>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="fiction-container">
                <h1>Adventure</h1>
                <div className="fiction">
                    {
                        adventure.map((item, index) => {
                            return <div onClick={() => navigate(`/book/${item._id}`)} className="box" key={index}>
                                <img src={item.image || "https://tse3.mm.bing.net/th/id/OIP.XTRtJ8QLrtuV5EQrqSo5hAAAAA?pid=Api&P=0&h=180"} alt={item.title} />
                                <h3>{item.title}</h3>
                                <p>{item.ratings}/5</p>
                                <p><b>&#8377;{item.price}</b></p>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="fiction-container">
                <h1>Highly Rated</h1>
                <div className="fiction">
                    {
                        rating.map((item, index) => {
                            return <div onClick={() => navigate(`/book/${item._id}`)} className="box" key={index}>
                                <img src={item.image || "https://tse3.mm.bing.net/th/id/OIP.XTRtJ8QLrtuV5EQrqSo5hAAAAA?pid=Api&P=0&h=180"} alt={item.title} />
                                <h3>{item.title}</h3>
                                <p>{item.ratings}/5</p>
                                <p><b>&#8377;{item.price}</b></p>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    </section>
}