const app = require('./app');
const dbConnect = require("./config/db");
require("dotenv").config();

const port = process.env.PORT;

app.listen(port, async () => {
    await dbConnect();
    console.log("Server is running..");
});