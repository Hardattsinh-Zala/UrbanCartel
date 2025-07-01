const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    language: {
        type: String,
        default: "English"
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        default: 0,
        required: true
    },
    image: {
        type: String,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            userId: { type: Schema.Types.ObjectId, ref: "User" },
            comment: String,
            rating: Number,
            createdAt: { type: Date, default: Date.now },
        },
    ],
    publishedYear: {
        type: Number,
    },
    pages: {
        type: Number,
    },
    format: {
        type: String,
        default: "Paperback",
    },
}, { timestamps: true });

const Book = new model("Book", bookSchema);
module.exports = Book;