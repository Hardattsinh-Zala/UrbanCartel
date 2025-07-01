const express = require("express");
const router = express.Router();
const contactControllers = require("../controllers/contact-controller");
const validate = require("../middlewares/validate");
const validator = require("../zod-model/validator");

router.route("/").post( validate(validator.contactSchema) , contactControllers.getMessage);

module.exports = router;