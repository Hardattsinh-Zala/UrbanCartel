const Book = require("../db_models/book-model");

const getItems = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const items = await Book.find().skip(skip).limit(limit);
        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
}

const getAllItems = async (req, res, next) => {
    try {
        const title = req.query.title;
        if(title.trim() === "") return;
        const dataset = await Book.find({title: {$regex: title, $options: "i"}});
        res.status(200).json(dataset);
    } catch (error) {
        next(error);
    }
}

const featuredItems = async (req, res, next) => {
    try {
        const category = req.query.category;
        const rating = parseFloat(req.query.rating);
        if(rating) {
            const data = await Book.find({ratings: {$eq: rating}});
            return res.status(200).json(data);
        }
        const data = await Book.find({category: {$regex: category, $options: "i"}}).limit(20);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

const getBookById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
}

const getManyBooks = async (req, res, next) => {
    try {
        const {ids} = req.body;
        const books = await Book.find({_id: {$in: ids}});
        res.status(200).json(books);
    } catch (error) {
        next(error)
    }
}

module.exports = {getItems, getAllItems, featuredItems, getBookById, getManyBooks};