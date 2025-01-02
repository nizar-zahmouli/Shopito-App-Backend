const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('CONNECTED SUCCESSFULY TO DB' ))
    .catch((error) => console.log(error));
};

module.exports = connectDB;