const express = require("express");
const router = express.Router();
const bookcontrollers = require("../controllers/book-controller")

router.route("/").get(bookcontrollers.featuredItems);
router.route("/search").get(bookcontrollers.getAllItems);
router.route("/shop").get(bookcontrollers.getItems);
router.route("/cart").post(bookcontrollers.getManyBooks);
router.route("/:id").get(bookcontrollers.getBookById);

module.exports = router;