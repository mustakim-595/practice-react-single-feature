const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    const db_url = process.env.DB_URI;
    try {
        const connectedDb = mongoose.connect(db_url);
        if (connectedDb) {
            console.log("DB Connected..")
        } else {
            console.log("DB Connection Error.!");
        }
    } catch (error) {
        console.log(error);
    };
};

module.exports = dbConnect;