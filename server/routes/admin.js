const express = require("express");
const router = express.Router();
const admincontrollers = require("../controllers/admin-controller");
const authFunction = require("../middlewares/auth-func");

router.route("/users").get(authFunction, admincontrollers.getAllUser);
router.route("/orders").get(authFunction, admincontrollers.getAllOrder);
router.route("/contacts").get(authFunction, admincontrollers.getAllContact);
router.route("/books").get(authFunction, admincontrollers.getAllBooks);
router.route("/editBook").patch(authFunction, admincontrollers.editBook);
router.route("/deleteBook/:id").delete(authFunction, admincontrollers.deleteBook);

module.exports = router;