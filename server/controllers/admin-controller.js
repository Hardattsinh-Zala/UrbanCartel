const User = require("../db_models/user-model");
const Order = require("../db_models/order-model");
const Contact = require("../db_models/contact-model");
const Book = require("../db_models/book-model");

const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch(error) {
        next(error);
    }
}

const getAllOrder = async (req, res, next) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch(error) {
        next(error);
    }
}

const getAllContact = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch(error) {
        next(error);
    }
}

const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch(error) {
        next(error);
    }
}

const editBook = async (req, res, next) => {
    try {
        const book = req.body;
        await Book.findByIdAndUpdate(book._id, book, {runValidators: true});
        res.status(200).json({msg: "Book data updated"});
    } catch (error) {
        next(error);
    }
}

const deleteBook = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Book.findByIdAndDelete(id);
        res.status(200).json({msg: "Book deleted"});
    } catch (error) {
        next(error);
    }
}

module.exports = {getAllUser, getAllOrder, getAllContact, getAllBooks, editBook, deleteBook};