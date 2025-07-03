import { useEffect, useState } from "react"
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router";

export function Books() {
    const [books, setBooks] = useState([]);
    const {URL, tokenBearer} = useAuth();
    const navigate = useNavigate();

    const getAllBooks = async () => {
        try {
            const response = await fetch(`${URL}/api/admin/books`, {
                method: 'GET',
                headers: {
                    Authorization: tokenBearer
                }
            });
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllBooks();
    }, []);

    return <section>
        <div className="users">
            <div className="users-container">
                {
                    books.length !== 0 ?
                    books.map((book, index) => {
                        return <div className="user-box" key={index}>
                            <img src={book.image || "https://tse3.mm.bing.net/th/id/OIP.XTRtJ8QLrtuV5EQrqSo5hAAAAA?pid=Api&P=0&h=180"} alt={book.title} />
                            <p><b>Title: </b> {book.title} </p>
                            <p><b>price: </b> {book.price} </p>
                            <p><b>Author: </b> {book.author} </p>
                            <button onClick={() => navigate('/admin/editBook', {state: {id: book._id}})} >Edit</button><br /><br />
                            <button onClick={() => navigate('/admin/deleteBook', {state: {id: book._id}})} >Delete</button>
                        </div>
                    })

                    :

                    <p>No Books yet</p>
                }
            </div>
        </div>
    </section>
}