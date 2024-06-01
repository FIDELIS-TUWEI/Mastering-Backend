const express = require("express");
const { createParticipant } = require("../controller/participant.controller");
const router = express.Router();

router.post("/", createParticipant);

module.exports = router;