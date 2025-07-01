const express = require("express");
const router = express.Router();
const ordercontrollers = require("../controllers/order-controller");
const authFunction = require("../middlewares/auth-func");

router.route("/add").post(authFunction, ordercontrollers.addOrder);
router.route("/show").get(authFunction, ordercontrollers.showOrders);

module.exports = router;