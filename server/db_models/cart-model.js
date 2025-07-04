const {Schema, model} = require("mongoose");

const cartItemSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    }
})

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [cartItemSchema]
}, {timestamps: true});

const Cart = new model("Cart", cartSchema);
module.exports = Cart;