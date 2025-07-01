const express = require("express");
const router = express.Router();
const cartcontrollers = require("../controllers/cart-controller");
const authFunction = require("../middlewares/auth-func");

router.route("/add").post(authFunction, cartcontrollers.addToCart);
router.route("/:uid").get(authFunction, cartcontrollers.getUserCart);
router.route("/delete/:id").delete(authFunction, cartcontrollers.deleteItemById);
router.route("/quantity/:id").patch(authFunction, cartcontrollers.editQuantity);

module.exports = router;