const mongoose = require("mongoose");

const participantsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
}, {
    timestamps: { createdAt: "Date_Created", updatedAt: "Date_Updated" }
});

module.exports = mongoose.model("Participant", participantsSchema);