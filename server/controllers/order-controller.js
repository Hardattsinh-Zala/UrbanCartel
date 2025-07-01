const Order = require("../db_models/order-model");
const Cart = require("../db_models/cart-model");

const addOrder = async (req, res, next) => {
    try {
        const uid = req.userData._id;
        const {items, total, address, status} = req.body;

        const cart = await Cart.findOne({user: uid});

        if(cart) {
            cart.items = [];
            await cart.save();
        }

        await Order.create({user: uid, items, total, address, status});
        res.status(201).json({msg: "Order placed successfully."});
    } catch (error) {
        next(error)
    }
}

const showOrders = async (req, res, next) => {
    try {
        const uid = req.userData._id;
        const orderData = await Order.find({user: uid});
        res.status(200).json(orderData);
    } catch (error) {
        next(error);
    }
}

module.exports = {addOrder, showOrders};