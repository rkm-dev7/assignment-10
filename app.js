require("dotenv").config();
const productRouter = require("./routes/products.route");
const userRouter = require("./routes/users.route");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require("cors");
var morgan = require("morgan");
const helmet = require("helmet");

const DB_HOST = process.env.DB_HOST;
const PORT = process.env.PORT || 5000;

// Middleware Function
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);

// exporting the app, mongoose, DB_HOST, PORT to the server.js file
module.exports = { app, mongoose, DB_HOST, PORT };
