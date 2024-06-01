const logger = require("./logger");

const requestlogger = async (req, res, next) => {
    logger.info("Method:", req.method);
    logger.info("Path:", req.path);
    logger.info("Body:", req.body);

    next();
};

const unknownendpoint = (req, res) => {
    res.status(404).send({ error: "unknown enpoint" })
};

module.exports = {
    requestlogger,
    unknownendpoint
};