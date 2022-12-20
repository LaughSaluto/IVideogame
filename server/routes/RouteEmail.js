const express = require("express");
const router = express.Router();
const cors = require("cors");

const EmailController = require("../controllers/EmailController");

router.post("/contactEmail", cors(), EmailController.createEmail);

module.exports = router;
