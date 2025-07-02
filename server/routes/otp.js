const express = require("express");
const router = express.Router();
const otpcontrollers = require("../controllers/otp-controller");
const validators = require("../zod-model/validator");
const validate = require("../middlewares/validate");

router.route("/generate").post(validate(validators.registerSchema), otpcontrollers.generator);
router.route("/verify").post(otpcontrollers.verifyOtp);

module.exports = router;