const Participant = require("../model/participant.model");

const createParticipant = async (req, res) => {
    try {
        const { firstName, lastName, username } = req.body;

        // 1. check if participant exists
        const duplicate = await Participant.findOne({ username });

        if (duplicate) {
            return res.status(400).json({ error: "Participant already exists!" });
        };

        // 2. create new participant
        const newParticipant = new Participant({
            firstName,
            lastName,
            username
        });

        if (newParticipant) {
            // save the created participant
            await newParticipant.save();
        } else {
            return res.status(400).json({ error: "Invalid participant data provided." });
        };

        res.status(201).json(newParticipant);

    } catch (error) {
        logger.error("Error occured in newParticipant controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    createParticipant
};