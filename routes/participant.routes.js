const express = require("express");
const { createParticipant, getParticipants, getParticipant, editParticipant } = require("../controller/participant.controller");
const router = express.Router();

router.post("/", createParticipant);
router.get("/", getParticipants);
router.get("/:id", getParticipant);
router.put("/:id", editParticipant);

module.exports = router;