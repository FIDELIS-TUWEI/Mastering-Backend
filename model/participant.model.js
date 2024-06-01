const mongoose = require("mongoose");

const participantsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
}, {
    timestamps: { createdAt: "Date_Created", updatedAt: "Date_Updated" }
});

module.exports = mongoose.model("Participant", participantsSchema);