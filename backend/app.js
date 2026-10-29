const express = require('express');
const router = require('./routes/product.route');
const cors = require("cors");
const userRouter = require('./routes/user.route');
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use("/auth", userRouter);

module.exports = app;
