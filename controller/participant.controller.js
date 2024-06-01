const Participant = require("../model/participant.model");

// @desc Create new Participant
const createParticipant = async (req, res) => {
    try {
        const { name } = req.body;

        // 1. check if participant exists
        const duplicate = await Participant.findOne({ username });

        if (duplicate) {
            return res.status(400).json({ error: "Participant already exists!" });
        };

        // 2. create new participant
        const newParticipant = new Participant({
            name
        });

        if (newParticipant) {
            // save the created participant
            await newParticipant.save();
        } else {
            return res.status(400).json({ error: "Invalid participant data provided." });
        };

        res.status(201).json(newParticipant);

    } catch (error) {
        logger.error("Error occured on newParticipant controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// @desc All Participants
const getParticipants = async (req, res) => {
    try {
        const participants = await Participant.find({}).lean();

        if (!participants) {
            return res.status(404).json({ error: "No Participants found!" });
        };

        res.status(200).json(participants);

    } catch (error) {
        logger.error("Error occured on getParticipants controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// @desc Single Participant
const getParticipant = async (req, res) => {
    try {
        const participantId = req.params.id;
        const participant = await Participant.findById(participantId);

        if (!participant) {
            return res.status(404).json({ error: `Participant with ID: ${participantId} not found!` });
        };

        res.status(200).json(participant);
        
    } catch (error) {
        logger.error("Error occured on getParticipant controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// @desc Update participant
const editParticipant = async (req, res) => {
    try {
        const participantId = req.params.id;
        // check if participant exists
        const participant = await Participant.findById(participantId);

        if (participant) {
            await Participant.findByIdAndUpdate(participantId, req.body, { new: true, runValidators: true });
            res.status(200).json({ message: "Participant Updated successfully" });
        } else {
            return res.status(404).json({ error: "Participant not found!" });
        }

        res.status(200).json(participant);

    } catch (error) {
        logger.error("Error occured on editParticipant controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// @desc Delete Participant
const deleteParticipant = async (req, res) => {
    try {
        const participantId = req.params.id;
        // check if participant exists
        const participant = await Participant.findById(participantId);

        if (participant) {
            await Participant.findByIdAndDelete(participantId);
            res.status(200).json({ message: "Participant deleted successfully" });
        } else {
            return res.status(404).json({ error: "Participant not found!" });
        }
    } catch (error) {
        logger.error("Error occured in deleteParticipant controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    createParticipant,
    getParticipants,
    getParticipant,
    editParticipant,
    deleteParticipant
};