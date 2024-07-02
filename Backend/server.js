const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const IndexRoute = require("./Routers/index");
const connectDatabase = require("./Helpers/database/connectDatabase");
const customErrorHandler = require("./Middlewares/Errors/customErrorHandler");
const jwtErrorHandler = require("./Middlewares/Errors/jwtErrorHandler"); // Import JWT error handler

dotenv.config({
    path:  './Config/config.env'
});

connectDatabase();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", IndexRoute);

// Register JWT error handler after routes
app.use(jwtErrorHandler);

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} : ${process.env.NODE_ENV}`);
});

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error : ${err}`);
    server.close(() => process.exit(1));
});
