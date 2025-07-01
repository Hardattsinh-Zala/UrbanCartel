const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");
const validate = require("../middlewares/validate");
const validator = require("../zod-model/validator");

router.route("/").get((req, res) => {
    res.send("Hello. This is home.");
});

router.route("/register").get((req, res) => {
    res.send("This is registeration page.");
}).post(validate(validator.registerSchema), authcontrollers.register);

router.route("/login").get((req, res) => {
    res.send("This is login page.");
}).post(validate(validator.loginSchema), authcontrollers.login);

module.exports = router;