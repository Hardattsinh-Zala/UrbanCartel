const Cart = require("../db_models/cart-model");

const getUserCart = async (req, res, next) => {
    try {
        const uid = req.params.uid;
        const cart = await Cart.findOne({user: uid});
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
}

const addToCart = async (req, res, next) => {
    try {
        const uid = req.userData._id;
        const {bookId, quantity} = req.body;

        const cart = await Cart.findOne({user: uid});

        if(cart) {
            const index = cart.items.findIndex(item => item.book.toString() === bookId);

            if(index > -1) {
                cart.items[index].quantity += quantity;
            }else {
                cart.items.push({book: bookId, quantity: quantity});
            }
            await cart.save();
            return res.status(201).json({msg: "Item added to cart."});
        }

        await Cart.create({user: uid, items: [{book: bookId, quantity: quantity}]});
        res.status(201).json({msg: "Item added to empty cart."});
    } catch (error) {
        next(error);
    }
}

const deleteItemById = async(req, res, next) => {
    try {
        const uid = req.userData._id;
        const id = req.params.id;
        const cart = await Cart.findOne({user: uid});

        cart.items = cart.items.filter(item => item.book.toString() !== id);
        await cart.save();
        res.status(200).json({msg: "Item deleted."});
    } catch (error) {
        next(error);
    }
}

const editQuantity = async (req, res, next) => {
    try {
        const uid = req.userData._id;
        const bookId = req.params.id;
        const operation = req.query.op;

        const cart = await Cart.findOne({user: uid});
        const item = cart.items.find(item => item.book.toString() === bookId);

        if(operation === "inr") {
            item.quantity += 1;
        }
        else if(operation === "dec") {
            if(item.quantity > 1) 
                item.quantity -= 1;
        }
        await cart.save();
        res.status(200).json(item.quantity);

    } catch (error) {
        next(error);
    }
}

module.exports = {getUserCart, addToCart, deleteItemById, editQuantity};