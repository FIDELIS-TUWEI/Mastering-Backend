const express = require("express");
const cors = require("cors");
const middleware = require("./utils/middleware");

const app = express();


app.use(express.json({ limit: '5mb' })); // to parse req.body // limit shouldn't be too high to prevent DoS attacks
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded);
app.use(cors());

app.use(middleware.requestlogger);

app.disable("x-powered-by"); // disable server fingerprinting

app.get("/", (req, res) => {
    res.json({ message: "Mastering Backend Development." });
});

app.all('*', (req, res)=> {
    return res.status(404).json({ error: `Can't find ${req.originalUrl} on the server` });
});

app.use(middleware.unknownendpoint);


module.exports = app;