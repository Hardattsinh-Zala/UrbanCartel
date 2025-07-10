import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../store/auth";

export function Shop() {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();
    const {URL} = useAuth();

    const getShopItems = async () => {
        try {
            const response = await fetch(`${URL}/api/book/shop?page=${page}&limit=20`, {
                method: 'GET',
            });

            const data = await response.json();
            setItems([...items, ...data]);
        } catch (error) {
            console.log(error);
        }
    }

    const searchFunction = async (e) => {
        try {
            const value = e.target.value;
            setSearch(value);
            if (value.trim() !== "") {
                const response = await fetch(`${URL}/api/book/search?title=${value}`, {
                    method: 'GET'
                })
                const dataset = await response.json();
                if (dataset) setItems(dataset);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(search.trim() === "") {
            getShopItems();
        }
    }, [page]);

    useEffect(() => {
        if(search.trim() === "") {
            setItems([]);
            setPage(1);
            getShopItems();
        }
    }, [search]);

    return <section className="shop">
        <div className="search-bar">
            <input type="text" name="search" placeholder="Search books" onChange={searchFunction} autoComplete="off" />
        </div>
        <div className="shop-banner"></div>
        {items.length === 0? <p><br /><br />No result found</p> : <p></p> }
        <div className="shop-container">
            {
                items.length !== 0?
                items.map((item, index) => {
                    return <div onClick={() => navigate(`/book/${item._id}`)} className="box" key={index}>
                        <img src={item.image || "https://tse1.mm.bing.net/th?id=OIP.tri5pcbkBl8M-Rv6U3uObAHaL2&pid=Api&P=0&h=180"} alt={item.title} />
                        <h3>{item.title}</h3>
                        <p>{item.ratings}/5</p>
                        <p><b>&#8377;{item.price}</b></p>
                    </div>
                })
                :
                <p>Loading...</p>
            }
        </div>
        {search === "" &&  <a className="see-more" onClick={() => setPage(page + 1)}>See more</a>}
    </section>
}