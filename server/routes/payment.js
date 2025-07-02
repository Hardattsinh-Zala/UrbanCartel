const Razorpay = require("razorpay");
const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const instance = new Razorpay({
    key_id: process.env.RAZOR_KEY_ID,
    key_secret: process.env.RAZOR_KEY_SECRET
});

router.route('/create-order').post(async (req, res, next) => {
    const {amount} = req.body;

    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: "receipt_order_74394",
    };

    try {
        const order = await instance.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        next({message: "Order creation failed."})
    }
});

router.route('/verify').post(async (req, res) => {
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
    const secret = process.env.RAZOR_KEY_SECRET;

    const generate_signature = crypto
        .createHmac("sha256", secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

    if(generate_signature === razorpay_signature) {
        res.status(200).json({success: true});
    }else {
        res.status(400).json({success: false});
    }
});

module.exports = router;