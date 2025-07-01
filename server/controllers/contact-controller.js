const Contact = require("../db_models/contact-model");

const getMessage = async (req, res, next) => {
    try {
        const {email, message} = req.body;
        await Contact.create({email, message});
        res.status(201).json({msg: "Message sent successfully."});
    } catch (error) {
        next(error);
    }
}

module.exports = {getMessage};