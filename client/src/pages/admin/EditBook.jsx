import { useLocation, useNavigate } from "react-router"
import { useAuth } from "../../store/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function EditBook() {
    const location = useLocation();
    const [book, setBook] = useState({});
    const {id} = location.state;
    const {URL, tokenBearer} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setBook({
            ...book,
            [name]: value
        });
    }

    const getBook = async () => {
        const response = await fetch(`${URL}/api/book/${id}`, {
            method: 'GET',
        });
        const data = await response.json();
        if(data) {
            setBook(data);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${URL}/api/admin/editBook`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: tokenBearer
            },
            body: JSON.stringify(book)
        });
        const data = await response.json();
        if(response.ok) {
            toast.success(data.msg);
            navigate('/admin/books');
        }else toast.error(data.msg);
    }

    useEffect(() => {
        getBook();
    }, []);

    return <section>
        <div className="editBook">
            <div className="editBook-container">
                <form onSubmit={handleSubmit}>
                    <h2>Edit book</h2>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" placeholder="Enter title" value={book.title || ""} onChange={handleChange} autoComplete="off" />

                    <label htmlFor="author">Author</label>
                    <input type="text" name="author" id="author" placeholder="Enter author" value={book.author || ""} onChange={handleChange} autoComplete="off" />

                    <label htmlFor="description">Description</label>
                    <textarea rows={10} type="description" name="description" id="description" placeholder="Enter description" value={book.description || ""} onChange={handleChange} autoComplete="off" />

                    <label htmlFor="category">Category</label>
                    <input type="text" name="category" id="category" placeholder="Set category" value={book.category || ""} onChange={handleChange} autoComplete="off" />

                    <label htmlFor="language">Language</label>
                    <input type="text" name="language" id="language" placeholder="Enter language" value={book.language || ""} onChange={handleChange} autoComplete="off" />

                    <label htmlFor="isbn">Isbn</label>
                    <input type="text" name="isbn" id="isbn" placeholder="Enter isbn" value={book.isbn || ""} onChange={handleChange} autoComplete="off" />

                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" placeholder="Enter price" value={book.price || 500} onChange={handleChange} autoComplete="off" />

                    <label htmlFor="discount">Discount</label>
                    <input type="number" name="discount" id="discount" placeholder="Set discount" value={book.discount || 0} onChange={handleChange} autoComplete="off" />

                    <label htmlFor="stock">Stock</label>
                    <input type="number" name="stock" id="stock" placeholder="Enter stock" value={book.stock || 0} onChange={handleChange} autoComplete="off" />

                    <label htmlFor="image">Image</label>
                    <input type="text" name="image" id="image" placeholder="Set image" value={book.image || ""} onChange={handleChange} autoComplete="off" />

                    <label htmlFor="ratings">Ratings</label>
                    <input type="number" name="ratings" id="ratings" placeholder="Enter ratings" value={book.ratings || 0} onChange={handleChange} autoComplete="off" />

                    <label htmlFor="publishedYear">Published Year</label>
                    <input type="number" name="publishedYear" id="publishedYear" placeholder="Enter publishedYear" value={book.publishedYear || 0} onChange={handleChange} autoComplete="off" />

                    <label htmlFor="pages">Pages</label>
                    <input type="number" name="pages" id="pages" placeholder="Enter pages" value={book.pages || 0} onChange={handleChange} autoComplete="off" />

                    <label htmlFor="format">Format</label>
                    <input type="text" name="format" id="format" placeholder="Enter format" value={book.format || ""} onChange={handleChange} autoComplete="off" />
                    
                    <button>Save</button>
                </form>
            </div>
        </div>
    </section>
}