const {Schema, model} = require("mongoose");

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            book: {type: Schema.Types.ObjectId, ref: "Book", required: true},
            quantity: {type: Number, required: true}
        }
    ],
    total: {
        type: Number,
        required: true
    },
    address: {
        fullName: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: Number, required: true },
        country: { type: String, required: true }
    },
    status: {
        type: String,
        enum: ["pending", "paid", "failed", "shipped", "delivered"],
        required: true
    }
}, {timestamps: true});

const Order = new model("Order", orderSchema);
module.exports = Order;