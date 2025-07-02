const express = require("express");
const router = express.Router();
const admincontrollers = require("../controllers/admin-controller");
const authFunction = require("../middlewares/auth-func");

router.route("/users").get(authFunction, admincontrollers.getAllUser);
router.route("/orders").get(authFunction, admincontrollers.getAllOrder);
router.route("/contacts").get(authFunction, admincontrollers.getAllContact);

module.exports = router;