const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.MONGO_URI;
const connectMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("MongoDB connected");
  });
};
module.exports = connectMongo;
