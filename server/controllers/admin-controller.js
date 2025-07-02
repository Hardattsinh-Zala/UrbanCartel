const User = require("../db_models/user-model");
const Order = require("../db_models/order-model");
const Contact = require("../db_models/contact-model");

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

module.exports = {getAllUser, getAllOrder, getAllContact};